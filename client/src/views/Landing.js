import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  Jumbotron,
  Button,
  Container,
  Card,
  Form,
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
          top: 0,
          backgroundImage:
            'url(' +
            'https://scontent.ffcm1-2.fna.fbcdn.net/v/t31.0-8/462724_327980603927350_71047181_o.jpg?_nc_cat=108&ccb=2&_nc_sid=d2e176&_nc_ohc=rVRquBQ3R68AX-vdn11&_nc_ht=scontent.ffcm1-2.fna&oh=a3e8f569f9d59cb2e45566706174e12a&oe=5FC80212' +
            ')',
        }}
      >
        {/* <div className="mt-5">
          <h1>Hello, world!</h1>
          <h3>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </h3>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </div> */}
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
          How We Operate
        </h1>
        <Row className="p-2">
          {stepsData.map((data, indx) => {
            return (
              <Container  style={{color:'#FF584A'}}>
                <Row className="p-2 text-left text-uppercase">
                  <Col lg="4" md="6" sm="6" key={indx}>
                    <h1><b>{data.name}</b></h1>
                  </Col>
                  <Col lg="8" md="6" sm="6" key={indx}>
                    <h3>{data.description}</h3>
                  </Col>
                </Row>
              </Container>
            );
          })}
        </Row>
        <h1 className="p-4" style={{ color: '#01408F' }}>
          What We Do
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
                    <LimitedText text= {data.description} />
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
