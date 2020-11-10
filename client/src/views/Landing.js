import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  Jumbotron,
  Button,
  Container,
  Card,
  Form,
  Accordion,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LimitedText } from '../components/texts/LimitedText';

import DataService from '../services/datas.service';
import Layout from '../shared/Layout';
export const Landing = () => {
  useEffect(() => {
    const serviceData = DataService.getData().SiteData.find(
      (x) => x.name === 'services'
    );

    const stepsData = DataService.getData().SiteData.find(
      (x) => x.name === 'steps'
    );
    const getAPI = () => {
      setServiceData(serviceData.datas);
      setStepsData(stepsData.datas);
    };
    getAPI();
  }, []);
  const [serviceData, setServiceData] = useState([]);
  const [stepsData, setStepsData] = useState([]);

  return (
    <Layout title="Landing Page" description="this is description">
      <Jumbotron
        className=""
        style={{
          color: 'white',
          borderRadius: 0,
          backgroundSize: 'cover',
          height: '100vh',
          marginBottom: 0,
          marginTop:-100,
          top: 0,
          backgroundImage:
            'url(' +
            'https://images.unsplash.com/photo-1563991655280-cb95c90ca2fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' +
            ')',
        }}
      >
         <div style={{marginTop:"60vh"}}>
          <h1>Hello, world!</h1>
          <h3>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </h3>
          
        </div> 
      </Jumbotron>
      <Container fluid>
        <Row className="pt-5 text-center">
          <Col sm={12} lg={12} style={{ color: '#FF867E' }}>
            <h4>
              <b>Build</b> a login/auth app with the{' '}
              <span style={{ fontFamily: 'monospace' }}>MERN</span> stack from
              scratch
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Create a (minimal) full-stack app with user authentication via
              passport and JWTs
            </p>
            <br />
          </Col>
        </Row>
        <h1 className="p-4" style={{ color: '#01408F' }}>
          How We Operate  <hr/>
        </h1>
       
        <Accordion>
          {stepsData.map((data, indx) => {
            return (
              <Card>
                 <Accordion.Toggle as={Card.Header} eventKey={indx+1}>
                <Card.Header className="text-capitalize text-grey">
                 <b>{data.name}</b> 
                  </Card.Header>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={indx+1}>
                <Card.Body>{data.description}</Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>
        
        <h1 className="p-4" style={{ color: '#01408F' }}>
          What We Do  <hr/>
        </h1>
        <Row className="p-2">
          {serviceData.map((data, indx) => {
            return (
              <Col lg="4" md="6" sm="12" key={indx}>
                <Card border="0" className="mb-4 shadow-lg">
                  <Card.Body style={{ color: '#364766' }}>
                    <Card.Title style={{ color: '#553EB5' }}>
                      {data.name}
                    </Card.Title>
                    <Card.Text>
                      <LimitedText text={data.description} />
                    </Card.Text>
                    <Link
                      to={{ pathname: '/page', model: data }}
                      className="btn btn-primary"
                    >
                      More Info
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Layout>
  );
};
