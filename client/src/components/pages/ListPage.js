import React, { useEffect, useState } from 'react';

import { Container, Button, Row, Col, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import pagesService from '../../services/pages.service';
import DashboardLayout from '../../shared/DashboardLayout';
import Grid from '../grids/grid';
import PopUp from '../popup';
import EditPage from './EditPage';


const ListPage = props => {


  useEffect(() => {
    getAPI();
  }, []);

  const getAPI = async () => {
    await pagesService.getContent()
      .then((result) => {
        setLoading(false);
        setPage(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initialFormState = { _id: null, name: '', description: '', image: '', price: '' }


  const [page, setPage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(initialFormState)


  const gridFields = [
    { title: 'Name', name: 'title', width: '15%' },
    { title: 'Code', name: 'pageCode', width: '15%' },
    { title: 'Display Position', name: 'displayPosition', width: '15%' }];



  const handleClose = () => {
    setShowPopUp(false);
  };

  const showModal = () => {
    setEditing(false);
    setShowPopUp(true);
  };

  const editRow = async (item) => {
    setShowPopUp(true);
    setCurrent({ _id: item._id, title: item.title, metaDescription: item.metaDescription, keywords: item.keywords, content: item.content, displayPosition: item.displayPosition, pageCode:item.pageCode })
  }

  const deleteRow = async (e) => {
    if (window.confirm("Are you sure?"))
      deletePage(e);
  }


  const deletePage = async (event) => {
    setMessage(null);
    event.preventDefault();
    await pagesService.deleteContent(event.target.id)
      .then((result) => {
        let successMsg = { status: "success", mode: "delete", text: "Successfully deleted." };
        setMessage(successMsg);
        setShow(true);
        getAPI();
      })
      .catch((err) => {
        let unsuccessMsg = { status: "failure", mode: "delete", text: "Oops! Something went wrong." };
        setMessage(unsuccessMsg);
        setShow(true);
      });
  }


  const updatePage = async (page) => {
   // console.log(page);
    await pagesService.editContent(page)
      .then((result) => {
        console.log(result);
        let successMsg = { status: "success", mode: "modified", text: "Successfully edited." };
        setMessage(successMsg);
        setShow(true);
        setShowPopUp(false);
        getAPI();
      })
      .catch((err) => {
        let unsuccessMsg = { status: "failure", mode: "modified", text: `Oops! Something went wrong. More info :: ${err.message}` };
        setMessage(unsuccessMsg);
        setShow(true);
      });
  }

  const [show, setShow] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);

  return (
    <DashboardLayout title="Pages" header="">
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
<PopUp
              title="Update Page"
              description=""
              show={showPopUp}
              hide={handleClose}
              size="lg">
                <EditPage
                  editing={editing}
                  setEditing={setEditing}
                  currentPage={current}
                  updatePage={updatePage}
                /> 
            </PopUp>

      {loading ? (
        <p>Loading...</p>
      ) : (
          <Container>
            <Row className="pt-4">
              <Col sm={12} md={12} lg={12}>
                <Grid
                  data={page}
                  size="sm"
                  striped={true}
                  fields={gridFields}
                  enableEdit={true}
                  editData={editRow}
                  deleteData={deleteRow}
                  enableDelete={false}
                  enableIndex={true}
                  enableSearch={false} />
              </Col>
            </Row>
          </Container>
        )}
    </DashboardLayout>
  );
};

export default ListPage;
