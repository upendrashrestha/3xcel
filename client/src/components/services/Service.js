import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import ServicesService from '../../services/services.service';

const Service = () => {
  useEffect(() => {
    const getAPI = async () => {
      await ServicesService.getContent()
        .then((result) => {
          console.log(result);
          setLoading(false);
          setService(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAPI();
  }, []);

  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <Col>
      <h3>Services</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Row>
          {service.map((data) => (
            <Col sm="12" md="6" lg="4" className="mb-5">
              <Card style={{ width: '100%' }} key={data._id}>
                {data.image !== '' && (
                  <Card.Img variant="top" src={data.image} />
                )}
                <Card.Body>
                  <Card.Title>{data.name}</Card.Title>
                  <Card.Text>{data.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Col>
  );
};

export default Service;
