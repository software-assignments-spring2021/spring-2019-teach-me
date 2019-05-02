import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { LinkContainer } from 'react-router-bootstrap'


class StudentDisplay extends Component {
    render() {
        return(
            <Card>
            <LinkContainer to={"/user/" + this.props.userID}>
                <Card.Body>
                    <Card.Img className="student-img" src={this.props.userProfilePic}></Card.Img>
                    <Card.Title>{this.props.className}</Card.Title>
                    <Card.Subtitle>{this.props.name} says:</Card.Subtitle>
                    <Card.Text>{this.props.commentText}</Card.Text>
                    <Card.Text className='italics-text'>Published on: {this.props.commentDate}</Card.Text>
                </Card.Body>
            </LinkContainer>
            </Card>
        )
    }
}

export default StudentDisplay;