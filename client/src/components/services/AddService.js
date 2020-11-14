import React, { useState } from 'react';
import { Form, Button, Container, Col } from 'react-bootstrap';
import ServicesService from '../../services/services.service';
import DashboardLayout from '../../shared/DashboardLayout';

const AddService = () => {
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeImage = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    const model = { name, description, image };
    await ServicesService.addContent(model)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DashboardLayout
      title="Add Service"
      description="Add new service"
      header="Add New Service"
    >
      
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formGroupTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              placeholder="Enter Service Title"
              onChange={onChangeName}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a service Title.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formGroupImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              required
              placeholder="Enter Image URL"
              onChange={onChangeImage}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a image URL.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formGroupDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={3}
              name="description"
              required
              placeholder="Enter Service Description"
              onChange={onChangeDescription}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a service description.
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="my-1">
            Add Service
          </Button>
        </Form>
      
    </DashboardLayout>
  );
};

export default AddService;
