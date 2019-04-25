import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'


class InstructorDisplay extends Component {
    render() {
        return(
            <Card>
                <Card.Body>
                    <Card.Img className="instructor-img" src={this.props.userProfilePic}></Card.Img>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Text>{this.props.introduction}</Card.Text>
                    <Card.Text className="italics-text">Rating: {this.props.rating}</Card.Text>
                    <LinkContainer to={"/instructors/" + this.props.slug}><Button variant="info">See Instructor Details</Button></LinkContainer>
                </Card.Body>
            </Card>
        );
    }
};

export default InstructorDisplay; 



