import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


class StudentDisplay extends Component {
    render() {
        return(
            <Card>
                <Card.Body>
                    <Card.Img className="student-img" src="/images/default-user.png"></Card.Img>
                    <Card.Subtitle>{this.props.name} says:</Card.Subtitle>
                    <Card.Text>{this.props.commentText}</Card.Text>
                    <Card.Text className='italics-text'>Published on: {this.props.commentDate}</Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default StudentDisplay;