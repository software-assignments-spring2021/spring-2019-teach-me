import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { LinkContainer } from 'react-router-bootstrap'

import './ClassDetail.css'

class ClassDetail extends Component {

    constructor(props) {
		super(props);

		this.state = {
			currentClass: {}
		};
	}

    componentDidMount() {
        const { classId } = this.props.match.params;
        const url = '/api/classes/' + classId;
        fetch(url)
			.then(response => response.json())
            .then(data => this.setState({currentClass: data}))
        
        /*const data = {"_id":"5c8547511c9d44000024fb63","name":"Piano","description":"Piano","price":75,"proposedSchedule":"Monday","instructor":"5c854805e0c8200000afd73a","rating":"9.6","cateogry":"Art"};
		this.setState({currentClass: data});*/
    }
    
    render() {
        const classData = this.state.currentClass;
        return (
            <div className='detail-page-container'>
                <Jumbotron>
					<h1>Class Detail: {classData.name}</h1>
					<p>{classData.description}</p>
				</Jumbotron>
                <div className='detail-container'>
                    <Row>
                        <Col sm={5}>
                            <div className='detail-image-container'>
                                <img alt='instructor profile' src='/images/default-user.png' className='instructor-image'></img>
                                <p>Class taught by:</p>
                                <LinkContainer to='/instructor/_id' className='instructor-link'><h5>instructor name here</h5></LinkContainer>
                            </div>
                        </Col>
                        <Col sm={7}>
                            <div className="detail-text-container">
                                <h3>About</h3>
                                <p>{classData.about}</p>
                                <h3>Pricing</h3>
                                <p>${classData.price}</p>
                                <h3>Proposed Class Schedule</h3>
                                <p>{classData.proposedSchedule}</p>
                                <h3>Class Category</h3>
                                <p>{classData.category}</p>
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