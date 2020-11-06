import React, { useState } from 'react';
import { Col, Row, Button, Container, Form } from 'react-bootstrap';
import { AngleBracketsRegex } from '../../constants/Constants';

export const InquiryForm = () => {
  const [inquiry, setInquiry] = useState({});
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      if (!AngleBracketsRegex.test(value))
        setInquiry({ ...inquiry, [name]: value });
    } else {
      setInquiry({ ...inquiry, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    console.log(inquiry);
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Row>
          <Col lg="6" md="6" sm="12">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                required
                placeholder="Company/Person Name"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a Name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg="6" md="6" sm="12">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                placeholder="Email"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide an Email.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg="6" md="6" sm="12">
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col lg="6" md="6" sm="12">
            <Form.Group>
              <Form.Label>Project Type</Form.Label>
              <Form.Control
                type="text"
                name="projectType"
                required
                placeholder="Web/Mobile/Ecommerce/Graphic Design etc..."
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a Project Type.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Project Details</Form.Label>
              <Form.Control
                type="text"
                name="projectDetails"
                required
                placeholder="Message"
                as="textarea"
                onChange={handleChange}
                rows={3}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a Project Details.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Additional Details </Form.Label>
              <Form.Control
                type="text"
                name="additionalDetails"
                placeholder="Additional Details"
                as="textarea"
                rows={3}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg="3">
            <Button type="Submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
