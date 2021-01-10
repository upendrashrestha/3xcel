import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Container, Form, Card } from 'react-bootstrap';
import pagesService from '../../services/pages.service';
import Layout from '../../shared/Layout';
import parse from 'html-react-parser';

const Page = (props) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (props.match.params.code) {
      setLoading(true);
      getData(props.match.params.code);
    }
    else {
      setNotFound(true);
    }
  }, [])

  const getData = async (code) => {
    await pagesService.getContentByCode(code)
      .then((res) => {
        setLoading(false);
        if (res.data.result)
          setData(res.data.result);
        else {
          let customData = {
            title: 'Oops! 404. Page not found',
            code: '404',
            metaDescription: 'Oops! 404. Page not found'
          };
          setData(customData);
        }
      })
      .catch((error) => {
        setData({ title: 'Ooops! 404 Page not found!', code: '404', metaDescription: '404! Page not found!' });
        setLoading(false);
      });
  };



  return (
    <Layout title={data.title} description={data.metaDescription}>
      <Container>
       
          <div style={{minHeight:'200px'}} className="pt-5 pb-2">
            {data.code === '404' && <h1 className="text-secondary text-center pt-4">{data.title}</h1>}
            {data.content && parse(data.content)}
          </div>
        
      </Container>
    </Layout>
  );
};

export default Page;
