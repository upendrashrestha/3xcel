import React, { useEffect, useState } from 'react';
import {  Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ServicesService from '../../services/services.service';
import DashboardLayout from '../../shared/DashboardLayout';

const ListService = () => {
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
    <DashboardLayout title="Services" header="List of Services">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Container>
            <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th style={{width:"5%"}}>Image</th>
      <th style={{width:"25%"}}>Name</th>
      <th style={{width:"75%"}} >Description</th>
    </tr>
  </thead>
  <tbody>
          {service.map((data) => (
            <tr key={data._id}>
              <td>
              <img width="100px" src={data.image} />
              </td>
              <td>
                <Link to={{pathname:'/edit-service', model:data}}>
                {data.name}
                    </Link> 
              </td>
              <td>
                {data.description}
              </td>
            </tr>
          ))}
          </tbody>
          </Table>
        </Container>
      )}
    </DashboardLayout>
  );
};

export default ListService;
