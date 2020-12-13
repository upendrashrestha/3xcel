import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import QuestionService from '../../services/question.service';

const Question = () => {
  useEffect(() => {
    const getAPI = async () => {
      await QuestionService.getContent()
        .then((result) => {
          console.log(result);
          setLoading(false);
          setQuestion(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAPI();
  }, []);

  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <Col>
      <h3>Questions</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Row>
          {question.map((data) => (
            <Col sm="12" md="6" lg="4" className="mb-5">
              <Card style={{ width: '100%' }} key={data._id}>
                <Card.Body>
                  <Card.Title>{data.question}</Card.Title>
                  <Card.Text>{data.answer}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Col>
  );
};

export default Question;
