import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from 'react-bootstrap';

const ProfileLayout = ({ title, description, children }) => {
  return (
    <Fragment >
      <Helmet>
        <title>{title ? title+"-upendra Shrestha" : "Upendra Shrestha"}</title>
        <meta name="description" content={description || "Upendra Shrestha"} />
      </Helmet>
      
      <Container
        fluid
        className="m-0 p-0 mb-5"
        style={{ backgroundColor: '#fff' }}
      >
     {children}
     </Container>
    </Fragment>
  );
}

export default ProfileLayout;