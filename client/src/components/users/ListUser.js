import React, { useEffect, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import UserService from '../../services/user.service';
import DashboardLayout from '../../shared/DashboardLayout';

const ListUser = () => {
  
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(false);
  
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

  useEffect(() => {
    getAPI();
  }, []);


  const handleDelete = async (e) => {
    if (window.confirm("Are you sure?"))
      deleteUser(e);
  }

  const deleteUser = async (event) => {
    setLoading(true)
    event.preventDefault();
    await UserService.deleteUser(event.target.id)
      .then((result) => {
        getAPI();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <DashboardLayout title="Users" header="All Users">
      {loading ? (
        <p>Loading...</p>
      ) : (
          <Container>
            <Table size="sm">
              <thead>
                <tr>
                  <th style={{ width: "30%" }}>Full Name</th>
                  <th style={{ width: "50%" }} >Email</th>
                  <th style={{ width: "20%" }} >Action</th>
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
                    <td><Button onClick={handleDelete} id={data._id} disabled={data.email==='upsth88@gmail.com'}>Delete</Button></td>
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
