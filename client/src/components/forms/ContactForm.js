import React, { useState } from 'react';
import { Col, Row, Button, Container, Form } from 'react-bootstrap';
import { AngleBracketsRegex } from '../../constants/Constants';

export const ContactForm = () => {
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
         
        </Row>

      
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                name="message"
                placeholder="Message"
                as="textarea"
                required
                rows={3}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a Message.
              </Form.Control.Feedback>
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
