import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ServicesService from '../../services/services.service';
import DashboardLayout from '../../shared/DashboardLayout';
import PopUp from '../../shared/popup';

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

  const showDeleteConfirmation = async (e) => {
    if (window.confirm("Are you sure?"))
      handleDelete(e);
  }

  const handleDelete = async (event) => {
    setMessage(null);
    event.preventDefault();
    await ServicesService.deleteContent(event.target.id)
      .then((result) => {
        let successMsg = { status: "success", mode: "delete", text: "Successfully deleted." };
        window.location.reload(false);
        setMessage(successMsg);
      })
      .catch((err) => {
        let unsuccessMsg = { status: "failure", mode: "delete", text: "Oops! Something went wrong." };
        setMessage(unsuccessMsg);
      });
  }

  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [deleting, setDeleting] = useState(false);
  return (
    <DashboardLayout title="Services" header="List of Services">
      {loading ? (
        <p>Loading...</p>
      ) : (
          <Container>
            <Table size="sm">
              <thead className="thead-dark">
                <tr>
                  <th style={{ width: "5%" }}>#</th>
                  <th style={{ width: "5%" }}>Image</th>
                  <th style={{ width: "25%" }}>Name</th>
                  <th style={{ width: "65%" }} >Description</th>
                  <th style={{width:"5"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {service.map((data, index) => (
                  <tr key={data._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img width="45px" height="45px" className="rounded-circle p-1 shadow-sm"
                        src={data.image} />
                    </td>
                    <td>
                      <Link to={{ pathname: '/edit-service', model: data }}>
                        {data.name}
                      </Link>
                    </td>
                    <td>
                      {data.description}
                    </td>
                    <td>
                      <Button className="my-1" disabled={deleting}
                        onClick={showDeleteConfirmation} id={data._id}
                      >Delete</Button>
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
