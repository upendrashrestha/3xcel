import React, { useState, useRef } from 'react';
import Editr from '../editor';
import { Form, Button, Row, Col, Toast } from 'react-bootstrap';
import { Positions } from '../../constants/Constants'
import DashboardLayout from '../../shared/DashboardLayout';
import pagesService from '../../services/pages.service';

const AddPage = props => {

    const initialFormState = { _id: null, title: '', content: '', metaDescription: '', keywords: '', displayPosition: '', pageCode:''};
    // const [current, setCurrent] = useState(initialFormState);
    const [model, setModel] = useState(initialFormState);
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'active')
            setModel({ ...model, [name]: e.target.checked });
        else
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
            await pagesService.addContent(model)
                .then((result) => {
                    let successMsg = { status: "success", mode: "added", text: "Successfully added." };
                    setMessage(successMsg);
                     setModel(initialFormState);
                    setShow(true);
                })
                .catch((err) => {
                    let unsuccessMsg = { status: "failure", mode: "added", text: "Oops! Something went wrong." };
                    setMessage(unsuccessMsg);
                    setShow(true);
                });


        }
    };




    return (
        <DashboardLayout title="Add New Page" header="Add New Page">
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
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col sm={12} md={4} lg={4}>
                        <Form.Group controlId="formGroupTitle">
                            <Form.Label>Page Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                required
                                placeholder="Enter Title"
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a Title.
            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={4} lg={4}>
                        <Form.Group controlId="formGroupPosition">
                            <Form.Label>Display Position</Form.Label>
                            <Form.Control as="select" size="md"  name="displayPosition"
                                required
                                placeholder="Display"
                                onChange={handleChange}>
                                {Positions.map(position => {
                                    return <option value={position.value}>{position.name}</option>
                                })}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please provide a display position.
            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={4} lg={4}>
                        <Form.Group controlId="formGroupCode">
                            <Form.Label>Code</Form.Label>
                            <Form.Control
                             name="pageCode"
                                required
                                placeholder="Enter code for page url"
                                type="text"
                                onChange={handleChange}>
                                
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please provide a display position.
            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>


                </Row>


                <Row>
                    <Col sm={12} md={6} lg={6}>

                        <Form.Group controlId="formGroupImage">
                            <Form.Label>Keywords</Form.Label>
                            <Form.Control
                                type="text"
                                name="keywords"
                                as="textarea"
                                row={3}
                                placeholder="Eg: Home, About, Information.."
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide keywords.
            </Form.Control.Feedback>
                        </Form.Group>

                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <Form.Group controlId="formGroupDescription">
                            <Form.Label>Meta Description</Form.Label>


                            <Form.Control
                                type="text"
                                as="textarea"
                                row={3}
                                name="metaDescription"
                                placeholder=""
                                onChange={handleChange}
                            />

                            <Form.Control.Feedback type="invalid">
                                Please provide a meta description.
            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="formGroupContent">
                    <Form.Label>Page Content</Form.Label>
                    <Editr onChange={handleChange} name="content" />
                    <Form.Control.Feedback type="invalid">
                        Please provide a page content.
            </Form.Control.Feedback>
                </Form.Group>



                <Button type="submit" className="my-1">
                    Save
          </Button>
            </Form>
        </DashboardLayout>
    );
};

export default AddPage;
