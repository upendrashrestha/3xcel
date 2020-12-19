import React from 'react';

import {  Container, Row, Col } from 'react-bootstrap';
const Footer = () => {
  return (
    <footer
      style={{ height: 'auto', minHeight:'300px', bottom:0, backgroundColor: '#14284B', color: '#A7AEBB'}}
    >
      <Container className="botom-0 text-center">
      <Row >
<Col sm={12} md={4} lg={4} className="p-5">
  <Container style={{textAlign:'left'}}>
    <h1>3xcel</h1>
    <Row>
      <Col sm={12}>
        Facebook
      </Col>
      <Col sm={12}>
        Twitter
      </Col>
      <Col sm={12}>
        Dev.to
      </Col>
      <Col sm={12}>
        Github
      </Col>
    </Row>
  </Container>
</Col>
<Col sm={12} md={4} lg={4} className="p-5">
<Container style={{textAlign:'left'}}>
    <h3>Help</h3>
    <Row>
      <Col sm={12}>
        Support
      </Col>
      <Col sm={12}>
        FAQ
      </Col>
      <Col sm={12}>
        Contact Us
      </Col>
    </Row>
  </Container>
</Col>
<Col sm={12} md={4} lg={4} className="p-5">
<Container style={{textAlign:'left'}}>
    
    <Row>
      <Col sm={12}>
        Terms
      </Col>
      <Col sm={12}>
        Privacy
      </Col>
    </Row>
  </Container>
</Col>
      </Row>
     
      <Row className="p-2" style={{textAlign:'left'}}>
          <p>
          &copy; 2020 3xcel.
          </p>
      </Row>
      </Container>
    </footer>
  );
};

export default Footer;
