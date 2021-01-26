import { faCrown, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import ScoresService from '../../services/scores.service';
export const ScoreBoard = (props) => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAPI();
    }, []);

    const getAPI = async () => {
        await ScoresService.getContent()
            .then((result) => {
                result.data.sort(function (a, b) {
                    return a.time - b.time;
                })
                setScores(result.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <strong><FontAwesomeIcon icon={faShieldAlt} /> SCORE BOARD </strong>
        

            {loading && 'Loading...' ||
                <Container className="p-4">
                    {scores.map((x, i) => {
                        return <Row className="text-uppercase text-monospace">
                            <Col sm={2}>{i === 0 && <FontAwesomeIcon icon={faCrown} />}</Col>
                            <Col sm={8}>{x.name} </Col>
                            <Col sm={2}> {x.time} </Col> </Row>
                    })}
                </Container>}

        </>
    );
}



