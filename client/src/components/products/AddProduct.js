import React, { useState, useRef } from 'react';
import Editr from '../editor';
import { Form, Button } from 'react-bootstrap';


const AddProduct = props => {

    const [model, setModel] = useState(null);
    const [validated, setValidated] = useState(false);

    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setModel({ ...model, [name]: value });

    };

    const handleSubmit = async (event) => {

        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();
        }
        setValidated(true);
        if (model !== null) {
            await props.handleSave(model).then(result => {
                setModel(null);
                // setLoading(false);
            }).catch((err) => {
                // setLoading(false);
            });
        }
    };




    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                    
                    placeholder="Enter Price"
                    onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a Price.
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formGroupDescription">
                <Form.Label>Description</Form.Label>
                <Editr onChange={handleChange} name="description" />
                <Form.Control.Feedback type="invalid">
                    Please provide a description.
            </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="my-1">
                Save
          </Button>
        </Form>
    );
};

export default AddProduct;
