import { faEnvelope, faGlobeAmericas, faGlobeAsia, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                <h2><FontAwesomeIcon icon={faMapMarkerAlt} /> Locations</h2>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <FontAwesomeIcon icon={faGlobeAmericas} /> <strong>USA</strong>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6} lg={6} className="pt-2">
                1938 Castaway Dr <br />
                Grand Prairie, TX <br />
                Phone: +1 (214) 901-0690
              </Col>

              <Col sm={12} md={6} lg={6} className="pt-2">
                7330 Gallagher Dr <br />
                Edina, MN <br />
                Phone: +977 9841723637
              </Col>
            </Row>
            <Row className="pt-4">
              <Col sm={12} md={12} lg={12}>
                <FontAwesomeIcon icon={faGlobeAsia} /> <strong>Nepal</strong>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6} lg={6} className="pt-2">
                Balaju, 16. <br />
                Kathmandu Nepal <br />
                Phone: +977 9841723637
              </Col>
            </Row>
            <br/>
            <Row>
              <Col sm={12} md={12} lg={12}>
                Email : <strong>info@3xcel.com</strong>
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
              <ContactForm lg={8} md={8} sm={12} />
            </Row>
          </Container>
        </Row>
      </Container>
    </Layout>
  );
};
