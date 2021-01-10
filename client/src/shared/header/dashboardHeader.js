import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import AuthService from '../../services/auth.service';
const DashboardHeader = () => {

  return (
    <header className='shadow-sm'>
      <Navbar bg="dark" variant="dark" expand="lg">

        <Navbar.Brand>Dashboard</Navbar.Brand>



      </Navbar>
      <Navbar bg="light" variant="dark" expand="lg">
        <Nav.Link href="/dashboard">Home</Nav.Link>
       
        
        <Nav.Link href="/products">Products</Nav.Link>
        <Nav.Link href="/services">Services</Nav.Link>
       
        <NavDropdown title="User Settings" id="basic-nav-dropdown">
          <NavDropdown.Item href="/list-users">List Users</NavDropdown.Item>
          <NavDropdown.Item href="/add-user">Add User</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="Pages" id="basic-nav-dropdown">
          <NavDropdown.Item href="/list-pages">List Pages</NavDropdown.Item>
          <NavDropdown.Item href="/add-page">Add Page</NavDropdown.Item>
        </NavDropdown>

        <Nav.Link href="/faqs">FAQ</Nav.Link>
        <Nav.Link onClick={()=>{AuthService.logout()}} href="/login">Log out</Nav.Link>
      </Navbar>
    </header>
  );
};

export default DashboardHeader;