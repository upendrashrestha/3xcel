import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav,  Button } from 'react-bootstrap';
import './header.css';
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 110) {
      setScrolled(true);
    } else setScrolled(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  let navbarClasses = ['header'];
  if (scrolled) {
    navbarClasses.push('scrolled');
  }
  
  return (
    <header className={navbarClasses.join(' ')}>
      <Navbar className="header-content">
        <Navbar.Brand href="/3xcel"> <img 
        height="35px"
        src={window.location.origin + "/3xcel-logo.png"} 
        alt="3xcel-logo" /></Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Button href="/contact" variant="outline-info" className="rounded-pill">
              <FontAwesomeIcon icon={faEnvelope}/> Contact Us
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
