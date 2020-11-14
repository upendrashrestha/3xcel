import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Col,Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ServicesService from '../../services/services.service';
import DashboardLayout from '../../shared/DashboardLayout';

const EditService = props => {

  const [service, setService] = useState(props.currentService);
  const [validated, setValidated] = useState(false);
 
  useEffect(
    () => {
      setService(props.currentService)
    },
    [ props ]
  )

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
    props.setEditing(true);
    await props.updateService(service);
  };

  return (
   <>
      {service &&
        <Row>
          <Col sm={12}>
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
                  as="textarea"
                  rows={3}
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
                Edit
              </Button>

            </Form>
          </Col>
          </Row>
           || <p>Please select the service again. <Link to='./list-services'>Go back</Link></p>
      }
      </>
  );
};

export default EditService;
