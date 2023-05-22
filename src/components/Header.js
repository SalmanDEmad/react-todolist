import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  

import '../assets/components/Header.css'

const Header = () => {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand href="#home" className="text-white ml-5">Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home" className="text-white">Home</Nav.Link>
          <Nav.Link href="#about" className="text-white">About</Nav.Link>
          <Nav.Link href="#contact" className="text-white">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
