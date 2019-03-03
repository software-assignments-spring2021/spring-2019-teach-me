import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavItem from 'react-bootstrap/NavItem'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'

import './NavBar.css'

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
		<LinkContainer to="/home"><Navbar.Brand>TeachMe</Navbar.Brand></LinkContainer>
		<Nav className="mr-auto">
			<LinkContainer to="/home"><NavItem className="nav-link">Home</NavItem></LinkContainer>
			<LinkContainer to="/classes"><NavItem className="nav-link">Class Listing</NavItem></LinkContainer>
			<LinkContainer to="/teach-others"><NavItem className="nav-link">Teach Others</NavItem></LinkContainer>
			<LinkContainer to="/about"><NavItem className="nav-link">About</NavItem></LinkContainer>
		</Nav>
		<Nav>
			<LinkContainer to="/log-in"><Button variant="outline-light">Log In</Button></LinkContainer>
			<LinkContainer to="/register"><Button variant="outline-light">Sign Up</Button></LinkContainer>
		</Nav>
    </Navbar>
  );
};

export default NavBar; 

