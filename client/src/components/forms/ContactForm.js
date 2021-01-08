import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Col, Row, Button, Container, Form } from 'react-bootstrap';
import { AngleBracketsRegex } from '../../constants/Constants';
import emailService from '../../services/email.service';

export const ContactForm = ({defaultMessage, lg, md, sm}) => {
  const [msg, setMsg] = useState(null);
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
      event.stopPropagation();
    }
    else {
      sendEmail(inquiry);
      hideForm();
    }
    setValidated(true);
    event.preventDefault();
  };

  const hideForm = () => {
    setMsg(defaultMessage && defaultMessage || 'Thank you for contacting us.');
    setInquiry({});
  }

  const sendEmail = async (model) => {
    await emailService.sendEmail(model);
  }

  return (
    <Container>
      {msg && <strong>{msg}</strong> ||
        <Form onSubmit={handleSubmit} method="post" noValidate validated={validated}>
          <Row>
            <Col lg={lg} md={md} sm={sm}>
              <Form.Group>
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={inquiry.name || ''}
                  required
                  placeholder="Full Name"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a Name.
              </Form.Control.Feedback>
              </Form.Group>
            </Col>
            </Row>
            <Row>
           <Col lg={lg} md={md} sm={sm}>
              <Form.Group>
                <Form.Label>Your Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={inquiry.email || ''}
                  required
                  placeholder="Email"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide an Email.
              </Form.Control.Feedback>
              </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col lg={lg} md={md} sm={sm}>
              <Form.Group>
                <Form.Label>Your Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={inquiry.phone || ''}
                  placeholder="Phone"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

          </Row>


          <Row>
          <Col lg={lg} md={md} sm={sm}>
              <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  type="text"
                  name="message"
                  placeholder="Message"
                  as="textarea"
                  value={inquiry.message || ''}
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
              <Button type="Submit">
                {`Send `}
                <FontAwesomeIcon icon={faPaperPlane}/>
                </Button>
            </Col>
          </Row>
        </Form>
      }
    </Container>
  );
};
