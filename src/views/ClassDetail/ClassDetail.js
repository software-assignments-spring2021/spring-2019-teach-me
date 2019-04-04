import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { LinkContainer } from 'react-router-bootstrap'

import './ClassDetail.css'

class ClassDetail extends Component {
    render() {
        const testtxt = 'A check or money order for $410 made payable to the US Department of Homeland Security. If paying by check, be sure that your name and address are pre-printed on it. If you have to hand write in either your name or address on the check then we recommend getting a money order instead. Write SEVIS ID on check/money order. Do NOT send your money order separate from the application the money order is for. Your money order should be included with your other application materials.';
        const { classId } = this.props.match.params;
        return (
            <div className='detail-page-container'>
                <Jumbotron>
					<h1>Class Detail: xyz</h1>
					<p>[short description goes here]</p>
				</Jumbotron>
                <div className='detail-container'>
                    <Row>
                        <Col sm={5}>
                            <div className='detail-image-container'>
                                <img alt='instructor profile' src='/images/default-user.png' className='instructor-image'></img>
                                <p>Class taught by:</p>
                                <LinkContainer to='/instructor/_id' className='instructor-link'><h5>Generic instructor name here</h5></LinkContainer>
                            </div>
                        </Col>
                        <Col sm={7}>
                            <div className="detail-text-container">
                                <h3>About</h3>
                                <p>{testtxt}</p>
                                <h3>Pricing</h3>
                                <p>$9999</p>
                                <h3>Proposed Class Schedule</h3>
                                <p>blah</p>
                                <h3>Class Category</h3>
                                <p>blah</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className='detail-buttons-container'>
                            <Button variant="info">Register now!</Button>
                            <Button variant="info" disabled>Contact Instructor</Button>
                        </div>
                    </Row>
                    <Row>
                        <div className='detail-comments-container'>
                        </div>
                    </Row>
                </div>
            </div>
        )
    }
}

export default ClassDetail;