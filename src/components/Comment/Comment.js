import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { LinkContainer } from 'react-router-bootstrap'

import "./Comment.css";

class StudentDisplay extends Component {
    render() {
        return(
            <Card>
                <Card.Body>
                    <Card.Img className="student-img" src={this.props.userProfilePic}></Card.Img>
                    <Card.Title>{this.props.className}</Card.Title>
                    <LinkContainer className="user-profile-link" to={"/user/" + this.props.userID}><Card.Subtitle>{this.props.name} says:</Card.Subtitle></LinkContainer>
                    <Card.Text>{this.props.commentText}</Card.Text>
                    <Card.Text className='italics-text'>Published on: {this.props.commentDate}</Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default StudentDisplay;