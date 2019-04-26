import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'


class ClassDisplay extends Component {
    render() {
        return(
            <Card>
                <Card.Body>
                    <Card.Img className="instructor-img" src={this.props.instructorProfilePic}></Card.Img>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>{this.props.description}</Card.Text>
                    <Card.Text className="italics-text">Taught by: {this.props.instructor} | Price: ${this.props.price} | Rating: {this.props.rating} | Category: {this.props.category}</Card.Text>
                    <LinkContainer to={"/classes/" + this.props.slug}><Button variant="info">See Class Details</Button></LinkContainer>
                </Card.Body>
            </Card>
        );
    }
};

export default ClassDisplay; 



