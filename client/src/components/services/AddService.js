import React, { useState } from 'react';
import { Form, Button, Container, Col } from 'react-bootstrap';
import ServicesService from '../../services/services.service';

import Editr from '../editor'

const AddService = props => {
  const [validated, setValidated] = useState(false);
  const initialFormState = { name: '', description: '', image: '' }
  const [service, setService] = useState(initialFormState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };




  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
     
      event.stopPropagation();
    }
    setValidated(true);
    await props.addService(service).then(result=>{
      setService(initialFormState);
    });

  };

  return (

    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formGroupTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="name"
          required
          placeholder="Enter Service Title"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a service Title.
            </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formGroupImage">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          name="image"
          required
          placeholder="Enter Image URL"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a image URL.
            </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formGroupDescription">
        <Form.Label>Description</Form.Label>
        {/* <Form.Control
          type="text"
          as="textarea"
          rows={3}
          name="description"
          required
          placeholder="Enter Service Description"
          onChange={handleChange}
        /> */}
       
    <Editr name="description"  onChange={handleChange} />
    
        <Form.Control.Feedback type="invalid">
          Please provide a service description.
            </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="my-1">
        Add Service
          </Button>
    </Form>
  );
};

export default AddService;
