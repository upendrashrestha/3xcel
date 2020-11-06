import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Col } from 'react-bootstrap';
import ServicesService from '../../services/services.service';
import DashboardLayout from '../../shared/DashboardLayout';

const EditService = (props) => {
  const [service, setService] = useState(props.location.model);
  const [validated, setValidated] = useState(false);

  useEffect(()=>{
      setService(props.location.model);
  },[]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
 
    await ServicesService.addContent(service)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DashboardLayout
      title="Add Service"
      description="Add new service"
      header="Add New Service"
    >
      <Col>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formGroupTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={service.name}
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
              value={service.image}
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
            <Form.Control
              type="text"
              name="description"
              value={service.description}
              required
              placeholder="Enter Service Description"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a service description.
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="my-1">
            Add Service
          </Button>
        </Form>
      </Col>
    </DashboardLayout>
  );
};

export default EditService;
