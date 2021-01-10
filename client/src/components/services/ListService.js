import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Table, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ServicesService from '../../services/services.service';
import DashboardLayout from '../../shared/DashboardLayout';
import AddService from './AddService';
import EditService from './EditService';
import Toast from 'react-bootstrap/Toast';
import Grid from '../grids/grid';
import PopUp from '../popup';


import parse from 'html-react-parser';

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
  
  const [showPopUp, setShowPopUp] = useState(false);
  const [editing, setEditing] = useState(false);
  
  const initialFormState = { _id: null, name: '', description: '', image: '' }


 

  const addService = async (service) => {
    await ServicesService.addContent(service)
      .then((result) => {
        let successMsg = { status: "success", mode: "added", text: "Successfully added." };
        setMessage(successMsg);
        setShow(true);
        setShowPopUp(false);
        getAPI();
        setCurrentService({ _id: '', name: '', description: '', image: '' });
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
       // console.log(result);
        let successMsg = { status: "success", mode: "modified", text: "Successfully edited." };
        setMessage(successMsg);
       setShow(true);
       setShowPopUp(false);
        getAPI();
        setEditing(false);
      })
      .catch((err) => {
        let unsuccessMsg = { status: "failure", mode: "modified", text: "Oops! Something went wrong." };
        setMessage(unsuccessMsg);
        setEditing(false);
       setShow(true);
      });
  }


 const deleteService = async (event) => {
    setMessage(null);
    event.preventDefault();
    await ServicesService.deleteContent(event.target.id)
      .then((result) => {
        let successMsg = { status: "success", mode: "delete", text: "Successfully deleted." };
        setMessage(successMsg);
        setShow(true);
        getAPI();
      })
      .catch((err) => {
        let unsuccessMsg = { status: "failure", mode: "delete", text: "Oops! Something went wrong." };
        setShow(true);
        setMessage(unsuccessMsg);
      });
  }
  const editRow = async(service) => {
    setEditing(true);
    setShowPopUp(true);
    setCurrentService({ _id: service._id, name: service.name, description: service.description, image: service.image })
  }

  const deleteRow = async (e) => {
    if (window.confirm("Are you sure?"))
      deleteService(e);
  }

  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const [currentService, setCurrentService] = useState(initialFormState)
  
 const gridFields = [
 {title:'Image',name:'image',width:'5%'},
 {title:'Name',name:'name', width:'25%'},
 {title:'Description', name:'description', width:'50%'}];


const handleClose = () => {
  setShowPopUp(false);
};

const showModal = () => {
  setEditing(false);
  setShowPopUp(true);
};

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
            display: "block"
          }}

          onClose={() => setShow(false)} show={show} delay={5000} autohide>
          <Toast.Body> {message.text}
          </Toast.Body>
        </Toast>
      }

      {loading ? (
        <p>Loading...</p>
      ) : (
          <Container>
                  
                  <Button 
        onClick={() => {
          showModal()
        }}
        className="p-1 button muted-button"
      >
        Add New Service
</Button>
             
                <PopUp
                title={editing && "Edit Service" || "Add New Service"}
                description=""
                show={showPopUp}
                hide={handleClose}
                size="lg">
                   {editing ===true  ? 
                  <EditService
                    editing={editing}
                    setEditing={setEditing}
                    currentService={currentService}
                    updateService={updateService}
                  /> :
                  <AddService addService={addService} />
                  }
                  </PopUp>
                
           
            <Row className="pt-4">
            <Col sm={12} md={12} lg={12}>
              <Grid 
              data={service}
              size="sm" 
              striped={true}
              fields={gridFields}
              enableEdit={true}
              editData ={editRow}
              deleteData={deleteRow}
              enableDelete={true}
              enableIndex={true}
              enableSearch={true}/>
               </Col>
            </Row>
          </Container>
        )}
    </DashboardLayout>
  );
};

export default ListService;
