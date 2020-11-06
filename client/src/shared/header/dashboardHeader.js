import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
const DashboardHeader = () => {

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
      
            <Navbar.Brand>Dashboard</Navbar.Brand>

      
     
      </Navbar>
      <Navbar bg="light" variant="dark" expand="lg">
      <Nav.Link href="/dashboard">Home</Nav.Link>
      <NavDropdown title="Services" id="basic-nav-dropdown">
      <NavDropdown.Item href="/list-services">List all Services</NavDropdown.Item>
        <NavDropdown.Item href="/add-service">Add Service</NavDropdown.Item>
        </NavDropdown>
      <NavDropdown title="User Settings" id="basic-nav-dropdown">
        <NavDropdown.Item href="/list-users">List Users</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.1">Add User</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Reset Password</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Deactivate User</NavDropdown.Item>
      </NavDropdown>
          </Navbar>
    </header>
  );
};

export default DashboardHeader;