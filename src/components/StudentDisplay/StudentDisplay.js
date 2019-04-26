import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
//import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'

import './StudentDisplay.css'

class StudentDisplay extends Component {
    render() {
        return(
            <Card>
                <LinkContainer to={"/user/" + this.props.userID}>
                    <Card.Body>
                        <Card.Img className="student-img" src={this.props.userProfilePic}></Card.Img>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>Registered on: {this.props.signupDate}</Card.Text>
                    </Card.Body>
                </LinkContainer>
            </Card>
        )
    }
}

export default StudentDisplay;