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
import PopUp from '../components/popup';
import Page from '../components/pages';
import './style.css';

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
  const [show, setShow] = useState(false);
const [currentData, setCurrentData] = useState(null);
  const handleClose = () => {
    setShow(false);
  };

  const showPopUp = () => {
    setShow(true);
  };


  return (
    <Layout title="Landing Page" description="this is description">
      <PopUp
        title={currentData && currentData.name}
        description=""
        show={show}
        hide={handleClose}
        size="lg"
      >
        <Page model={currentData}/>
      </PopUp>
      <Container >
        <div
          className="jumbotron-main"
        >
          <div className="jumbotron-content">
            <h1>Hello, Internet!</h1>
            <i>
              Make your digital dream true.
          </i>
          </div>
        </div>

        <Row className="mb-4">
          {stepsData.map((data, indx) => {
            return (<Col sm={12} md={4} lg={4} className="text-center">
              <span className="p-2 text-capitalize" style={{ color: '#FF867E' }}>
                <b>{`${indx + 1}. ${data.name}`}</b>
              </span>
              <p>{data.description}</p>
            </Col>)
          })}
        </Row>



        {/* <Accordion>
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
        </Accordion> */}


        <h4 className="p-2" style={{ color: '#01408F' }}>
          We XCEL <hr />
        </h4>
        <Row className="pb-5 text-center">
          {serviceData.map((data, indx) => {
            return (
              <Col lg={4} md={4} sm={12} key={indx}
                className="p-2" >
                <a className="p-2" onClick={()=>{setCurrentData(data); showPopUp();}}>
                  {data.name}
                </a>
              </Col>
            );
          })}
        </Row>

      </Container>
    </Layout>
  );
};
