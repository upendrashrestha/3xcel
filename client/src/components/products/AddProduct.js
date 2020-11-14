import React, { useState, useRef } from 'react';

import { Form, Button, Container, Col } from 'react-bootstrap';
import ProductsService from '../../services/products.service';
import DashboardLayout from '../../shared/DashboardLayout';

const AddService = () => {

    const form = useRef();
    const [model, setModel] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModel({ ...model, [name]: value });
    };

    const handleSubmit = async (event) => {
        setLoading(true);
     
        await ProductsService.addContent(model)
            .then((result) => {
                console.log(result);
                setLoading(false);
            })
            .catch((err) => {
                setMessage(err);
                setLoading(false);
            });

    };

    return (
        <DashboardLayout
            title="Add Product"
            description="Add new product"
            header=" New Product"
        >
         
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="formGroupTitle">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            required
                            placeholder="Enter Name"
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a Name.
            </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupImage">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            required
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
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a Price.
            </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            required
                            placeholder="Enter Description"
                            as="textarea"
                            rows={3}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a description.
            </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="my-1">
                        Save
          </Button>
                </Form>
        </DashboardLayout>
    );
};

export default AddService;
