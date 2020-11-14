import React, { useEffect, useState } from 'react';

import {Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductsService from '../../services/products.service';
import DashboardLayout from '../../shared/DashboardLayout';

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

  return (
    <DashboardLayout title="Products" header="List of Products">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Container>
            <Table size="sm">
  <thead className="thead-dark">
    <tr>
      <th style={{width:"5%"}}>Image</th>
      <th style={{width:"20%"}}>Name</th>
      <th style={{width:"20%"}}>Price</th>
      <th style={{width:"55%"}} >Description</th>
    </tr>
  </thead>
  <tbody>
          {product.map((data) => (
            <tr key={data._id}>
              <td>
              <img width="100px" src={data.image} />
              </td>
              <td>
                <Link to={{pathname:'/edit-product', model:data}}>
                {data.name}
                    </Link> 
              </td>
              <td>{data.price}</td>
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

export default ListProduct;
