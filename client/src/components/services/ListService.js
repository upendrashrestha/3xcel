import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Table, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ServicesService from '../../services/services.service';
import DashboardLayout from '../../shared/DashboardLayout';
import AddService from './AddService';
import EditService from './EditService';
import Toast from 'react-bootstrap/Toast';

const ListService = () => {
  useEffect(() => {
    getAPI();
  }, []);

  const getAPI = async () => {
    await ServicesService.getContent()
      .then((result) => {
        setLoading(false);
        setService(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [show, setShow] = useState(false);
  const initialFormState = { _id: null, name: '', description: '', image: '' }
  const [editing, setEditing] = useState(false)
  const showDeleteConfirmation = async (e) => {
    if (window.confirm("Are you sure?"))
      deleteService(e);
  }

  const deleteService = async (event) => {
    setMessage(null);
    event.preventDefault();
    await ServicesService.deleteContent(event.target.id)
      .then((result) => {
        let successMsg = { status: "success", mode: "delete", text: "Successfully deleted." };
        setMessage(successMsg);
        getAPI();
      })
      .catch((err) => {
        let unsuccessMsg = { status: "failure", mode: "delete", text: "Oops! Something went wrong." };
        setMessage(unsuccessMsg);
      });
  }

  const addService = async (service) => {
    await ServicesService.addContent(service)
      .then((result) => {
        let successMsg = { status: "success", mode: "added", text: "Successfully added." };
        setMessage(successMsg);
        setShow(true);
        getAPI();
      })
      .catch((err) => {
        let unsuccessMsg = { status: "failure", mode: "added", text: "Oops! Something went wrong." };
        setMessage(unsuccessMsg);
        setShow(true);
        console.log(err);
      });
  }


  const updateService = async (service) => {
    console.log("Service", service);
    await ServicesService.editContent(service)
      .then((result) => {
        console.log(result);
        let successMsg = { status: "success", mode: "modified", text: "Successfully edited." };
        setMessage(successMsg);
        setShow(true);
        setEditing(false);
        getAPI();
      })
      .catch((err) => {
        let unsuccessMsg = { status: "failure", mode: "modified", text: "Oops! Something went wrong." };
        setMessage(unsuccessMsg);
        setEditing(false);
        setShow(true);
      });
  }

  const editRow = service => {
    setEditing(true)
    setCurrentService({ _id: service._id, name: service.name, description: service.description, image: service.image })
  }

  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [currentService, setCurrentService] = useState(initialFormState)

  return (
    <DashboardLayout title="Services" header="Services">
      {message &&

        <Toast
          style={{
            position: 'absolute',
            top: 20,
            right: 10,
            backgroundColor: message.status === 'success' && "#5cb85c" || "#ed1922",
            color: "#fff",
            width: "300",
            display: "block"
          }}

          onClose={() => setShow(false)} show={show} delay={50000} autohide>
          <Toast.Body> {message.text}
          </Toast.Body>
        </Toast>
      }

      {loading ? (
        <p>Loading...</p>
      ) : (
          <Container>
            <Row>
              <Col sm={12} md={6} lg={6} className="border-right">
           
              {editing ? (
                <>
                  <h5>Edit Service</h5>
                  <EditService
                    editing={editing}
                    setEditing={setEditing}
                    currentService={currentService}
                    updateService={updateService}
                  />
                </>
              ) : (
                  <>
                    <h5>Add New Service</h5>
                    <AddService addService={addService} />
                  </>
                )}
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Table size="sm">
                <thead className="thead-dark">
                  <tr>
                    <th style={{ width: "5%" }}>#</th>
                    <th style={{ width: "5%" }}>Image</th>
                    <th style={{ width: "25%" }}>Name</th>
                    <th style={{ width: "60%" }} >Description</th>
                    <th style={{ width: "10" }}>Action</th>
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
                        <Button
                          onClick={() => {
                            editRow(data)
                          }}
                          className="button muted-button"
                        >
                          Edit
              </Button>
                        <Button className="my-1" disabled={deleting}
                          onClick={showDeleteConfirmation} id={data._id}
                        >Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            </Row>
          </Container>
        )}
    </DashboardLayout>
  );
};

export default ListService;
