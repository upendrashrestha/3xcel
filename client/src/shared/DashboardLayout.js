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
      <Container className="p-2">
        <div className="pt-2 pb-4">
          {header &&
            <span className="border-bottom font-weight-bold d-block">{header}</span>
          }
        </div>
        {children}
      </Container>

    </Fragment>
  );
};

export default DashboardLayout;
