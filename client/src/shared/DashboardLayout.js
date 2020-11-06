import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col } from 'react-bootstrap';
import DashboardHeader from './header/dashboardHeader';

const DashboardLayout = ({ title, description, children, header }) => {
  return (
    <Fragment>
      <Helmet>
        <title>{title ? title + '-3xcel Dashboard' : '3xcel Dashboard'}</title>
        <meta name="description" content={description || '3xcel Dashboard'} />
      </Helmet>
      <DashboardHeader />
      <Container className="p-4">
      <h3>{header}</h3>
      </Container>
    
        <Container>
          {children}
        </Container>
      
    </Fragment>
  );
};

export default DashboardLayout;
