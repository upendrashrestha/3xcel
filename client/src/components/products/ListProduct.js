import React, { useEffect, useState } from 'react';

import { Container, Button, Row, Col } from 'react-bootstrap';
import ProductsService from '../../services/products.service';
import DashboardLayout from '../../shared/DashboardLayout';
import Grid from '../grids/grid';
import PopUp from '../popup';
import AddProduct from './AddProduct';

import Toast from 'react-bootstrap/Toast';
import EditProduct from './EditProduct';

const ListProduct = props => {


  useEffect(() => {
    getAPI();
  }, []);

  const getAPI = async () => {
    await ProductsService.getContent()
      .then((result) => {
        setLoading(false);
        setProduct(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initialFormState = { _id: null, name: '', description: '', image: '', price: '' }
  const [current, setCurrent] = useState(initialFormState);

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);


  const gridFields = [
    { title: 'Image', name: 'image', width: '5%' },
    { title: 'Name', name: 'name', width: '25%' },
    { title: 'Price', name: 'price', width: '15%' },
    { title: 'Description', name: 'description', width: '50%' }];



  const handleClose = () => {
    setShowPopUp(false);
  };

  const showModal = () => {
    setEditing(false);
    setShowPopUp(true);
  };

  const editRow = async (item) => {
    setEditing(true);
    setShowPopUp(true);
    setCurrent({ _id: item._id, name: item.name, description: item.description, image: item.image, price: item.price })
  }

  const deleteRow = async (e) => {
    if (window.confirm("Are you sure?"))
      deleteProduct(e);
  }


  const deleteProduct = async (event) => {
    setMessage(null);
    event.preventDefault();
    await ProductsService.deleteContent(event.target.id)
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


  const updateProduct = async (product) => {
    console.log(product);
    await ProductsService.editContent(product)
      .then((result) => {
        console.log(result);
        let successMsg = { status: "success", mode: "modified", text: "Successfully edited." };
        setMessage(successMsg);
        setShow(true);
        setShowPopUp(false);
        getAPI();
        setEditing(false);
      })
      .catch((err) => {
        let unsuccessMsg = { status: "failure", mode: "modified", text: `Oops! Something went wrong. More info :: ${err.message}` };
        setMessage(unsuccessMsg);
        setEditing(false);
        setShow(true);
      });
  }

  const [show, setShow] = useState(false);

  const [showPopUp, setShowPopUp] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);
  const saveProduct = async (model) => {
    await ProductsService.addContent(model)
      .then((result) => {
        let successMsg = { status: "success", mode: "added", text: "Successfully added." };
        setMessage(successMsg);
        setShow(true);
        setShowPopUp(false);
        getAPI();
        setCurrent({ _id: '', name: '', description: '', image: '' });
      })
      .catch((err) => {
        let unsuccessMsg = { status: "failure", mode: "added", text: "Oops! Something went wrong." };
        setMessage(unsuccessMsg);
        setShow(true);
      });
  }


  return (
    <DashboardLayout title="Products" header="List of Products">
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
              Add New Product
</Button>

            <PopUp
              title={editing && "Edit Product" || "Add New Product"}
              description=""
              show={showPopUp}
              hide={handleClose}
              size="lg">
              {editing === true ?
                <EditProduct
                  editing={editing}
                  setEditing={setEditing}
                  currentProduct={current}
                  updateProduct={updateProduct}
                /> :

                <AddProduct handleSave={saveProduct} />
              }
            </PopUp>


            <Row className="pt-4">
              <Col sm={12} md={12} lg={12}>
                <Grid
                  data={product}
                  size="sm"
                  striped={true}
                  fields={gridFields}
                  enableEdit={true}
                  editData={editRow}
                  deleteData={deleteRow}
                  enableDelete={true}
                  enableIndex={true}
                  enableSearch={true} />
              </Col>
            </Row>
          </Container>
        )}
    </DashboardLayout>
  );
};

export default ListProduct;
