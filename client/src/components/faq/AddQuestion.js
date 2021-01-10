import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import Editr from '../editor';
import { QuestionCategories } from '../../constants/Constants'

const AddQuestion = props => {
  const [validated, setValidated] = useState(false);
  const initialFormState = { question: '', answer: '', category: 'OTHER' }
  const [question, setQuestion] = useState(initialFormState);
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
   // console.log(question);
    await props.addQuestion(question).then(result => {
      setQuestion(initialFormState);
    });

  };

  return (

    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formGroupTitle">
        <Form.Label>Question</Form.Label>
        <Form.Control
          type="text"
          name="question"
          required
          placeholder="Enter Question Title"
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
      
        <Editr name="answer" onChange={handleChange} />

        <Form.Control.Feedback type="invalid">
          Please provide a question description.
            </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="my-1">
        Add Question
          </Button>
    </Form >
  );
};

export default AddQuestion;
