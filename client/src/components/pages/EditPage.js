import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Toast} from 'react-bootstrap';
import Editr from '../editor';
import { Positions } from '../../constants/Constants'

import DashboardLayout from '../../shared/DashboardLayout';
import pagesService from '../../services/pages.service';

const EditPage = props => {

  const [page, setPage] = useState(props.currentPage);
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(
    () => {
      setPage(props.currentPage)
    },
    [ props ]
  )

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPage({ ...page, [name]: value });
  };

 const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
   
    props.updatePage(page);
  };

  return (<>
{page &&
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col sm={12} md={4} lg={4}>
                        <Form.Group controlId="formGroupTitle">
                            <Form.Label>Page Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                required
                                value={page.title}
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
                            <Form.Control as="select" size="md" custom name="displayPosition"
                                required
                                placeholder="Display Position"
                                value={page.displayPosition}
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
                                type="text"
                                name="pageCode"
                                required
                                value={page.pageCode}
                                placeholder="Enter Code"
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a Title.
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
                                value={page.keywords}
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
                                value={page.metaDescription}
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
                    <Editr onChange={handleChange} name="content" value={page.content} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a page content.
            </Form.Control.Feedback>
                </Form.Group>



                <Button type="submit" className="my-1">
                    Update
          </Button>
            </Form>
        
                              }
      </>
  );
};

export default EditPage;
