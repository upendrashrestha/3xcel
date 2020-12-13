import React, { useState, useRef } from 'react';
import Editr from '../editor';
import { Form, Button } from 'react-bootstrap';


const AddProduct = props => {

    const form = useRef();
    const [model, setModel] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setModel({ ...model, [name]: value });
        console.log(model);
    };

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
         
          event.stopPropagation();
        }
        await props.handleSave(model).then(result=>{
          setModel(null);
          setLoading(false);
        }).catch((err)=>{
            setLoading(false);
        });
    };

    const fields =[
        {name:'name', isRequired:true, type:'text', label:'Name'},
        {name:'price', isRequired:true, type:'currency', label:'Price'},
        {name:'image', isRequired:true, type:'text', label:'Image URL'},
        {name:'description', isRequired:true, type:'editor', label:'Description'}
    ]

    

    return ( 
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
                        {/* <Form.Control
                            type="text"
                            name="description"
                            required
                            placeholder="Enter Description"
                            as="textarea"
                            rows={3}
                            onChange={handleChange}
                        />  */}
                        <Editr onChange={handleChange} name="description" />
                        <Form.Control.Feedback type="invalid">
                            Please provide a description.
            </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="my-1">
                        Save
          </Button>
          <p>{model.description}</p>
                </Form>
    );
};

export default AddProduct;
