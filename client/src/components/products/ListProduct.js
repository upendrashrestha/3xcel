import React, { useEffect, useState } from 'react';

import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductsService from '../../services/products.service';
import DashboardLayout from '../../shared/DashboardLayout';
import Grid from '../grids/grid';
import PopUp from '../popup';
import AddProduct from './AddProduct';

const ListProduct = props => {
  useEffect(() => {
    const getAPI = async () => {
      await ProductsService.getContent()
        .then((result) => {
          console.log(result);
          setLoading(false);
          setProduct(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAPI();
  }, []);

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const gridHead = [{ title: '#', width: '5%' },
  { title: 'Image', width: '5%' },
  { title: 'Name', width: '15%' },
  { title: 'Price', width: '15%' },
  { title: 'Description', width: '40%' },
  { title: 'Action', width: '10%' }];

  const gridBody = product.map((data, indx) => (
    <tr key={data._id}>
      <td>{indx + 1}</td>
      <td>
        <img width="100px" src={data.image} />
      </td>
      <td>
        <Link to={{ pathname: '/edit-product', model: data }}>
          {data.name}
        </Link>
      </td>
      <td>{data.price}</td>
      <td>
        {data.description}
      </td>

      <td>
        <Button
          onClick={() => {
          }}
          className="p-1 button muted-button"
        >
          Edit
  </Button>
        <Button className="mx-1 p-1" id={data._id}
        >Delete</Button>
      </td>
    </tr>
  ));

  const handleClose = () => {
    setShowPopUp(false);
  };
  
  const showModal = () => {
    setEditing(false);
    setShowPopUp(true);
  };

  const [show, setShow] = useState(false);
  
  const [showPopUp, setShowPopUp] = useState(false);
  const [editing, setEditing] = useState(false);

  const saveProduct = async(model) =>{
    await ProductsService.addContent(model)
    .then((result) => {
        console.log(result);
        setLoading(false);
    })
    .catch((err) => {
        setLoading(false);
    });
  }

  return (
    <DashboardLayout title="Products" header="List of Products">
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
                title={editing && "Edit Service" || "Add New Service"}
                description=""
                show={showPopUp}
                hide={handleClose}
                size="lg">
                   {editing ===true  ? 
                  <p>EDITING</p>:
                  <AddProduct handleSave={saveProduct} />
                  }
                  </PopUp>


            <Row className="pt-4">
              <Col sm={12} md={12} lg={12}>
                <Grid header={gridHead} body={gridBody} size="sm" striped={true} />
              </Col>
              </Row>
          </Container>
        )}
    </DashboardLayout>
  );
};

export default ListProduct;
