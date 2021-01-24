import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import { faEnvelope, faGlobe, faInfoCircle, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faInstagramSquare, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { ContactForm } from '../forms/ContactForm';
import PopUp from '../popup';
import { Helmet } from 'react-helmet-async';
import pagesService from '../../services/pages.service';

const Profile = () => {
    const [show, setShow] = useState(false);
    
  const [pages, setPages] = useState([]);

  useEffect(() => {
    getAPI();
  }, []);

  const getAPI = async () => {
    await pagesService.getContent()
      .then((result) => {
        setPages(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

    const handleClose = () => {
        setShow(false);
    };

    const showPopUp = () => {
        setShow(true);
    };

    const getAsPostLinks = () => {
        return pages && pages.map(page => {
          if (page.displayPosition === '2') {
            return <Nav.Link href={`/${page.pageCode}`}>{page.title}</Nav.Link>;
          }
        });
      
    }

    return (
        <>
            <Helmet>
                <title>{"Upendra Shrestha"}</title>
                <meta name="description" content="Upendra Shrestha - Profile" />
                <meta name="keywords" content="upsth, upendra, shrestha, web developer, software developer, .net developer, microsoft stack developer, react developer, C#, csharp, sql server, asp.net, asp, javascript, js, hello world, urbi, upendrashrestha, github, facebook, instgram, twitter, gmail, aws, amazon, amplify, mern, mangose, mongodb, db" />
                <meta name="author" content="Upendra Shrestha"></meta>
            </Helmet>
            <Container className="p-4">
                <PopUp
                    title={'Contact Form'}
                    icon={faEnvelope}
                    description=""
                    show={show}
                    hide={handleClose}
                    size="md"
                >

                    <ContactForm defaultMessage='Thank you for reaching out to me. I will get back to you as soon as possible.' lg={12} md={12} sm={12} />



                </PopUp>
                <Row className="gutters-sm">
                    <Col sm={12} md={4} lg={4} className="mb-3">
                        <Card>
                            <Card.Body>
                                <div className="d-flex flex-column align-items-center text-center mb-2">
                                    {
                                    /* <img  src={window.location.origin + "/upendra-shrestha.png"}  alt="Upendra Shrestha" className="rounded-circle" width="120" height="110" />
 */
 }

                                    <div className="mt-3">
                                        <h5>Upendra Shrestha</h5>
                                        <p className="text-dark">upsth88@gmail.com</p>
                                        <p className="text-secondary mb-1">Full Stack Developer</p>
                                        {/* <p className="text-muted font-size-sm">Minneapolis, MN</p> */}

                                        <button className="btn btn-sm btn-outline-primary" onClick={showPopUp}>
                                            <FontAwesomeIcon icon={faEnvelope} /> Message</button>
                                    </div>
                                </div>

                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">

                                        <h6 className="mb-0">
                                            <FontAwesomeIcon icon={faGlobe} /> Website</h6>
                                        <span className="text-secondary">https://upsth.com</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">
                                            <FontAwesomeIcon icon={faGithub} /> Github</h6>
                                        <span className="text-secondary">upendrashrestha</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><FontAwesomeIcon icon={faTwitter} /> Twitter</h6>
                                        <span className="text-secondary">@upsth88</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><FontAwesomeIcon icon={faInstagramSquare} /> Instagram</h6>
                                        <span className="text-secondary">urbishrestha</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><FontAwesomeIcon icon={faFacebook} /> Facebook</h6>
                                        <span className="text-secondary">urbishrestha</span>
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={12} md={8} lg={8}>

                    <Navbar bg="light" variant="dark" expand="sm">
        {getAsPostLinks()}
        </Navbar>
                       <Card>
                            <Card.Body>
                                <h3>Hello!</h3>
                                <br />
                                <p>My name is Upendra Shrestha. I am a Software Developer (.Net) with more than six years of experience.</p>
                                <p> <FontAwesomeIcon icon={faInfoCircle} /> I am using this site to play around with new technologies.</p>
                                <Card className="mb-2">
                                    <Card.Body>
                                        <h5>Projects (Deployed/Future) </h5>
                                        <p>
                                            <a href="/pegjump"> Peg Jump Solitaire Game </a> Created using simple HTML, CSS and Javascript.  <a href="/pegjump"> <FontAwesomeIcon icon={faPlay} /> Play</a>
                                        </p>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Body>
                                        <span>Tools and Technologies used for this site : </span>

                                        <span className="mr-1 badge badge-primary">MERN</span>
                                        <span className="mr-1 badge badge-primary">React JS</span>
                                        <span className="mr-1 badge badge-primary">Github</span>
                                        <span className="mr-1 badge badge-primary">AWS (Amplify)</span>
                                        <span className="mr-1 badge badge-primary">AWS (S3)</span>
                                        <span className="mr-1 badge badge-primary">Bootstrap 4</span>
                                        <span className="mr-1 badge badge-primary">VS Code</span>

                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container></>);
}

export default Profile;