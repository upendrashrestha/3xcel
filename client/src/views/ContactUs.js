import React from 'react';
import { Col, Row, Button, Container, Form } from 'react-bootstrap';
import { ContactForm } from '../components/forms/ContactForm';
import Layout from '../shared/Layout';
export const ContactUs = () => {
  return (
    <Layout title="Contact Us" description="this is description">
      <Container fluid>
        <Row>
          <Container className="p-4">
            <Row className="pt-5 pb-2 text-center">
              <Col lg={12} className="text-left">
                <h2>Locations</h2>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <strong>USA</strong>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6} lg={6} className="pt-2">
                1938 Castaway Dr <br />
                Grand Prairie, TX <br />
                Email: info@3xcel.com <br />
                Phone: +1 (214) 901-0690
              </Col>

              <Col sm={12} md={6} lg={6} className="pt-2">
                7330 Gallagher Dr <br />
                Edina, MN <br />
                Email: info@3xcel.com <br />
                Phone: +977 9841723637
              </Col>
            </Row>
            <Row className="pt-4">
              <Col sm={12} md={12} lg={12}>
                <strong>Nepal</strong>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6} lg={6} className="pt-2">
                Balaju, 16. <br />
                Kathmandu Nepal <br />
                Email: info@3xcel.com <br />
                Phone: +977 9841723637
              </Col>
            </Row>
            <Row className="pt-5">
              <Col sm={12} lg={12} style={{ color: '#FF867E' }}>
                <h3>
                  Get in <b>touch</b>
                </h3>
                <p className="flow-text grey-text text-darken-1">
                  We'd love to hear from you. Use the form below to drop us an
                  email. We will be in touch with you as soon as posible.
                </p>
                <br />
              </Col>
            </Row>
            <Row>
              <ContactForm/>
            </Row>
          </Container>
        </Row>
      </Container>
    </Layout>
  );
};
