import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavItem from 'react-bootstrap/NavItem'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import './NavBar.css'

class NavBar extends Component {
	render() {
		if (this.props.auth.isAuthenticated) {
			console.log(this.props.auth);
			return(
				<Navbar bg="primary" variant="dark">
					<LinkContainer to="/home"><Navbar.Brand>TeachMe</Navbar.Brand></LinkContainer>
					<Nav className="mr-auto">
						<LinkContainer to="/home"><NavItem className="nav-link">Home</NavItem></LinkContainer>
						<LinkContainer to="/classes"><NavItem className="nav-link">Class Listing</NavItem></LinkContainer>
						<LinkContainer to="/teach-others"><NavItem className="nav-link">Teach Others</NavItem></LinkContainer>
						<LinkContainer to="/about"><NavItem className="nav-link">About</NavItem></LinkContainer>
					</Nav>
					<Nav>
						<LinkContainer to="/dashboard"><NavItem className="nav-link">Hello {this.props.auth.user.name}</NavItem></LinkContainer>
						<LinkContainer to="/class-history"><NavItem className="nav-link">My Class History</NavItem></LinkContainer>
					</Nav>
				</Navbar>
			)
		}
		else {
			return(
				<Navbar bg="primary" variant="dark">
					<LinkContainer to="/home"><Navbar.Brand>TeachMe</Navbar.Brand></LinkContainer>
					<Nav className="mr-auto">
						<LinkContainer to="/home"><NavItem className="nav-link">Home</NavItem></LinkContainer>
						<LinkContainer to="/classes"><NavItem className="nav-link">Class Listing</NavItem></LinkContainer>
						<LinkContainer to="/teach-others"><NavItem className="nav-link">Teach Others</NavItem></LinkContainer>
						<LinkContainer to="/about"><NavItem className="nav-link">About</NavItem></LinkContainer>
					</Nav>
					<Nav>
						<LinkContainer to="/login"><Button variant="outline-light">Log In</Button></LinkContainer>
						<LinkContainer to="/register"><Button variant="outline-light">Sign Up</Button></LinkContainer>
					</Nav>
				</Navbar>
			)
		}
	}
}

NavBar.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(NavBar);

