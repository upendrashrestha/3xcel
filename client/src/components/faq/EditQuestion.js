import React, { useEffect, useState } from 'react';
import { Form, Button, Col,Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Editr from '../editor';
import { QuestionCategories } from '../../constants/Constants'
const EditQuestion = props => {

  const [question, setQuestion] = useState(props.currentQuestion);
  const [validated, setValidated] = useState(false);
 
  useEffect(
    () => {
      setQuestion(props.currentQuestion)
    },
    [ props ]
  )

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

 const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    props.setEditing(true);
    await props.updateQuestion(question);
  };

  return (
   <>
      {question &&
        <Row>
          <Col sm={12}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formGroupTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="question"
                  value={question.question}
                  required
                  placeholder="Enter Question"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a question Title.
            </Form.Control.Feedback>
              </Form.Group>

             
              <Form.Group controlId="formGroupTitle">
      <Form.Label>Category</Form.Label>
        <Form.Control as="select" size="sm" custom name="category"
          required
          placeholder="Enter Category"
          value={question.category}
          onChange={handleChange}>
          {QuestionCategories.map(category => {
            return <option value={category.value}>{category.name}</option>
          })}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please provide a Category.
            </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formGroupDescription">
        <Form.Label>Answer</Form.Label>
      
        <Editr name="answer" onChange={handleChange}  value={question.answer} />

        <Form.Control.Feedback type="invalid">
          Please provide a question description.
            </Form.Control.Feedback>
      </Form.Group>
              <Button type="submit" className="my-1">
                Update
              </Button>

            </Form>
          </Col>
          </Row>
           || <p>Please select the question again. <Link to='./list-questions'>Go back</Link></p>
      }
      </>
  );
};

export default EditQuestion;
