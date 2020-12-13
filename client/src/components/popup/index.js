import React from 'react';
import {Modal} from 'react-bootstrap';

const PopUp = ({ show, title, description, children, hide, size }) => {
  
    return (
     <Modal show={show} onHide={hide} size={size}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p>{description}</p>
          {children}
          </Modal.Body>
        </Modal>
    );
};

export default PopUp;
