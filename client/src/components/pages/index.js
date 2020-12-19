import React, { useState,useEffect } from 'react';
import { Col, Row, Button, Container, Form, Card } from 'react-bootstrap';
import Layout from '../../shared/Layout';
import PopUp from '../popup';
import { InquiryForm } from '../forms/InquiryForm';
const Page = (props) => {
  const [data,setData] = useState({});
  const [show, setShow] = useState(false);

  useEffect(()=>{
      let newData;
    if(props.model)
    newData =props.model;
    else{
        newData ={name:'404! Service not found', description : 'Please select service from home page.'}; 
    } 
    const getData = () => {
        setData(newData);
      };
      getData()
  },[])

  const handleClose = () => {
    setShow(false);
  };

  const showPopUp = () => {
    setShow(true);
  };

  return (
    <>
      <PopUp
        title="Lets start project"
        description="Tell us about your big ideas and plans. We’re here to listen, learn, and to help you achieve."
        show={show}
        hide={handleClose}
        size="lg"
      >
        <InquiryForm />
      </PopUp>

            <p className="flow-text grey-text text-darken-1">
              {data.description}
            </p>
            <Button onClick={showPopUp}>Lets create your dream project</Button>
           
        
    </>
  );
};

export default Page;
