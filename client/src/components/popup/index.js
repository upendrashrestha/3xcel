import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Modal } from 'react-bootstrap';

const PopUp = ({ show, title, icon, description, children, hide, size }) => {

  return (
    <Modal show={show} onHide={hide} size={size}>
      <Modal.Header closeButton>
        <Modal.Title>
          {icon && <FontAwesomeIcon icon={icon} />} 
          {` ${title}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{description}</p>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default PopUp;
