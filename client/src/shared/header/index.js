import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
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

  let navbarClasses = [''];
  if (scrolled) {
    navbarClasses.push('scrolled');
  }
  
  return (
    <header className={navbarClasses.join(' ')}>
     
      <Navbar bg="transparent" className='header'>
        <Navbar.Brand href="/">3XCEL</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Button href="/contact" variant="outline-info" className="rounded-pill">
              {' '}
              Contact Us
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    </header>
  );
};

export default Header;
