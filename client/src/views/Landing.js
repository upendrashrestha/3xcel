import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  Container,
  Card,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <Page model={currentData} />
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
              <span className="p-2 text-capitalize">
                <h1 style={{ color: '#FF867E' }}><b className="text-muted">{indx + 1}. </b>{data.name} </h1>
              </span>
              <p className="text-justify">{data.description}</p>
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




        <h4 style={{ color: '#01408F' }}>
          We XCEL <hr />
        </h4>


        <Container>
          <Row>
            {serviceData.map((data, indx) => {
              return (
                <Col className="p-2" sm={12} lg={4} md={6}>
                  <a className="customHover" onClick={() => { setCurrentData(data); showPopUp(); }}>
                    <Card className="p-2 border-0 text-center" bg="">
                     <h6>
                      <FontAwesomeIcon  icon={data.icon} /> {data.name}
                      </h6>
                    </Card>
                  </a>

                </Col>
              );
            })}

          </Row>
        </Container>
      </Container>



    </Layout>
  );
};
