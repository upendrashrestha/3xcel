import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Col,Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ServicesService from '../../services/services.service';
import DashboardLayout from '../../shared/DashboardLayout';
import Toast from 'react-bootstrap/Toast';

const EditService = (props) => {

  const [service, setService] = useState(props.location.model);
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };



  const handleSubmit = async (event) => {
    setLoading(true);
    setMessage(null);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    await ServicesService.editContent(service)
      .then((result) => {
        console.log("Service", service);
        let successMsg = { status: "success", mode: "modified", text: "Successfully edited." };
        setMessage(successMsg);
        setShow(true);
        setLoading(false);
      })
      .catch((err) => {
        let unsuccessMsg = { status: "failure", mode: "modified", text: "Oops! Something went wrong." };
        setMessage(unsuccessMsg);
        setLoading(false);
        setShow(true);
      });
  };

  return (
    <DashboardLayout
      title="Add Service"
      description="Add new service"
      header="Add New Service"
    >
     
          {message &&
          
           <Toast
             style={{
               position: 'absolute',
               top: 20,
               right: 10,
               backgroundColor: message.status === 'success' && "#5cb85c" || "#111",
               color:"#fff",
               width: "300",
               display:"block"
             }}
            
           onClose={() => setShow(false)} show={show} delay={5000} autohide>
              <Toast.Body> {message.text}
              </Toast.Body>
            </Toast>
            }
        
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
              <Button type="submit" className="my-1" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )
                  || <span>Edit</span>}
              </Button>

            </Form>
          </Col>
          </Row>
           || <p>Please select the service again. <Link to='./list-services'>Go back</Link></p>
      }
    </DashboardLayout>
  );
};

export default EditService;
