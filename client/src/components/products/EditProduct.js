import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Editr from '../editor';

const EditProduct = props => {

  const [product, setProduct] = useState(props.currentProduct);
  const [validated, setValidated] = useState(false);
 
  useEffect(
    () => {
      setProduct(props.currentProduct)
    },
    [ props ]
  )

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

 const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    props.setEditing(true);
    await props.updateProduct(product);
  };

  return (
   <>
      {product &&
        <Row>
          <Col sm={12}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formGroupTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={product.name}
                  required
                  placeholder="Enter Title"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a product Title.
            </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formGroupImage">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={product.image}
                  placeholder="Enter Image URL"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a image URL.
            </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formGroupImage">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="currency"
                    name="price"
                    required
                    placeholder="Enter Price"
                    value={product.price}
                    onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a Price.
            </Form.Control.Feedback>
            </Form.Group>

              <Form.Group controlId="formGroupDescription">
                <Form.Label>Description</Form.Label>
                <Editr onChange={handleChange} name="description" value={product.description} />

                <Form.Control.Feedback type="invalid">
                    Please provide a description.
            </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="my-1">
                Update
              </Button>

            </Form>
          </Col>
          </Row>
           || <p>Please select the product again. <Link to='./list-products'>Go back</Link></p>
      }
      </>
  );
};

export default EditProduct;
