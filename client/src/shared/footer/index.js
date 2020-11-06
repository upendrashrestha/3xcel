import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const Footer = () => {
  return (
    <footer
      style={{ height: 'auto', backgroundColor: '#14284B', color: '#A7AEBB'}}
    >
      <Container className="botom-0">
        <Row className="p-4">
          <Col sm="12" md="4" lg="4">
            <Container className="p-2">
              <Row>
                <Col lg="12">3XCEL</Col>
                <Col lg="12">All rights reserved.</Col>
              </Row>
            </Container>
          </Col>
          <Col sm="12" md="4" lg="4">
            <Container className="p-2">
              <Row>
                <Col lg="12" className="p-2"></Col>
                <Col lg="12">What we do</Col>
                <Col lg="12">Contact Us</Col>
                <Col lg="12">Careers</Col>
                <Col lg="12">Terms & Condition</Col>
              </Row>
            </Container>
          </Col>
          <Col sm="12" md="4" lg="4">
            <Container className="p-2">
              <Row>
                <Col lg="12" className="p-2">
                  Find us on the internet
                </Col>
                <Col lg="12">Facebook</Col>
                <Col lg="12">Twitter</Col>
                <Col lg="12">Instagram</Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
