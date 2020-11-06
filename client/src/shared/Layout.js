import React, { Fragment } from 'react';
import Header from './header';
import Footer from './footer';

import { Helmet } from 'react-helmet-async';
import { Container } from 'react-bootstrap';

const Layout = ({ title, description, children }) => {
  return (
    <Fragment>
      <Helmet>
        <title>{title ? title+"-3xcel" : "3xcel"}</title>
        <meta name="description" content={description || "Test"} />
      </Helmet>
      <Header />
      <Container
        fluid
        className="m-0 p-0 shadow mb-5"
        style={{ backgroundColor: '#fff' }}
      >
     {children}
     </Container>
      <Footer />
    </Fragment>
  );
}

export default Layout;