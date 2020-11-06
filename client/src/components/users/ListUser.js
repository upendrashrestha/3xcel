import React, { useEffect, useState } from 'react';
import {  Table, Container } from 'react-bootstrap';
import UserService from '../../services/user.service';
import DashboardLayout from '../../shared/DashboardLayout';

const ListUser = () => {
  useEffect(() => {
    const getAPI = async () => {
      await UserService.getAllUsers()
        .then((result) => {
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
    <DashboardLayout title="Users" header="All Users">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Container>
            <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th style={{width:"50%"}}>Full Name</th>
      <th style={{width:"50%"}} >Email</th>
    </tr>
  </thead>
  <tbody>
          {service.map((data) => (
            <tr key={data._id}>
             
              <td>
                {data.name}
              </td>
              <td>
                {data.email}
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

export default ListUser;
