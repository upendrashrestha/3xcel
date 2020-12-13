import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Editr from '../editor';


const CustomForm = props => {
    //props.fields [] - name, type, value, label, isRequired
    //props.handleSave
    const { fields = [] } = props;
    const [validation, setValidation] = useState([]);
    useEffect(() => {
        fields.map((field) => {
            return {  ...field, errorMessage: '' };
        });
        
    })

    const [valid, setValid] = useState(true);

    const [model, setModel] = useState('');

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModel({ ...model, [name]: value });
        props.handleUpdate(e);
    };

    const validateModel = () => {
        setValid(true);
        fields.map((field) => {
            if (field.isRequired && !model[field.name]) {
                setValid(false);
                return { ...field, errorMessage: "This is required field." };
            } 
            return field;
        });
    };

    const handleSubmit = (event) => {
        validateModel();
        valid && props.handleSave(model) ||
            event.preventDefault();
    }


return (<Form noValidate onSubmit={handleSubmit}>
    {fields.map((field, i) => {
        return <Form.Group controlId={`formGroup${field.name}`}>
            {field.label && <Form.Label>{`${field.label} ${field.isRequired && '*'}`}</Form.Label>}
            {field.type === 'editor' &&
                <Editr onChange={handleChange} name={field.name} /> ||
                <Form.Control
                    type={field.type || 'text'}
                    name={field.name}
                    required={field.isRequired}
                    value={field.value}
                    placeholder={field.placeholder || ''}
                    onChange={handleChange}
                />
            }
            
        </Form.Group>
    })}
    <Button type="submit" className="my-1">
        {loading && valid && 'Processing..' || 'Submit'}
    </Button>
    { !valid && 
               <p> * Value missing in required field/s.</p>
            }
</Form>
);
};

export default CustomForm;
