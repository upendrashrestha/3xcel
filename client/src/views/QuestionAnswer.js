import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Container, Accordion, Card, Badge } from 'react-bootstrap';
import { LimitedText } from '../components/texts/LimitedText';

import parse from 'html-react-parser';
import QuestionService from '../services/questions.service';

export const QuestionAnswer = () => {
    useEffect(() => {
        const getAPI = async () => {
            await QuestionService.getContent()
                .then((result) => {
                    console.log(result);
                    setLoading(false);
                    setQuestion(result.data);
                    setCategories(result.data.map(x => x.category).filter(onlyUnique))
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getAPI();
    }, []);

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }


    const [question, setQuestion] = useState([]);
    const [categorisedResult, setCategorisedResult] = useState([]);
    const [result, setResult] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState('');

    const handleCategory = (e) => {
        setActive(e.target.name);
        setResult(question.filter(q => q.category == e.target.name));
        setCategorisedResult(question.filter(q => q.category == e.target.name));
    }

    const handleClear = () => {
        setResult(null);
        setCategorisedResult(null);
        setActive('');
    }

    const doSearch = async (e) => {
        const val = e.target.value;
        const queryDataSet = (categorisedResult && categorisedResult.length > 0) ? categorisedResult : question;
        let searchedList = (queryDataSet.filter(o =>
            Object.keys(o).some(k => o[k].toString().toLowerCase().includes(val.toString().toLowerCase()))));
        setResult(searchedList);

    }

    const displayAccordion = (dataSet) => {
        return <>{dataSet && <Accordion>
            {dataSet.map((data, indx) => {
                return (
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={indx + 1} size="sm">
                            <div className="btn text-capitalize p-0 d-flex justify-content-between align-items-center">
                                <b>{data.question}</b>
                                <Badge variant="primary">{data.category}</Badge>

                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={indx + 1}>
                            <Card.Body>{parse(data.answer)}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                );
            })}
        </Accordion>}
        </>
    }


    return (
        <Container>

            {loading ? (
                <p>Loading...</p>
            ) : (
                    <>
                        <Container className="p-2">

                            <Row className="p-2">
                                <Col lg="4" md="4" sm="8" >
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="searchText"
                                        placeholder="Search..."
                                        onChange={doSearch}
                                    />
                                </Col>
                                <Col md={{ span: 4, offset: 4 }} sm="4">
                                    <a className="btn btn-link p-2" onClick={handleClear}>
                                        Clear &#10006;</a>
                                </Col>

                            </Row>
                        </Container>
                        <Container fluid className="p-2">
                            <Row>
                                <Col lg='3' md='3' sm='3' className="block p-2" >
                                    {categories.map(x => {
                                        return <Col>
                                     
                                     <a className={`btn btn-link ${active === x ? 'disabled' :''}`}
                                        onClick={handleCategory} 
                                        name={x}>{x}</a>
                                    
                                        </Col>
                                    })}
                                </Col>
                                <Col lg='9' md='9' sm='9' className="mt-4">
                                    {displayAccordion(result)}
                                </Col>
                            </Row>

                        </Container>

                    </>
                )}
        </Container>
    );

};