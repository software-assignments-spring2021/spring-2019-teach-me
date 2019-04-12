import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
//import Button from 'react-bootstrap/Button'
//import { LinkContainer } from 'react-router-bootstrap'

import './StudentDisplay.css'

class StudentDisplay extends Component {
    render() {
        return(
            <Card>
                <Card.Body>
                    <Card.Img className="student-img" src="/images/default-user.png"></Card.Img>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Text>Registered on: {this.props.signupDate}</Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default StudentDisplay;