import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert';
import { LinkContainer } from 'react-router-bootstrap'
import { StudentDisplay } from '../../components/StudentDisplay';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import './ClassDetail.css'

class ClassDetail extends Component {

    constructor(props) {
		super(props);

		this.state = {
            currentClass: {},
            successRedirect: {},
            loginRequired: false,
            classNotRegistered: false,
            noStudentAlert: false,
            studentsList: []
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleWithdraw = this.handleWithdraw.bind(this);
        this.getStudents = this.getStudents.bind(this);
    }

    getStudents() {
        const { classId } = this.props.match.params;
        const url = '/api/get-students/' + classId;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({studentsList: data}, function() {
                if (this.state.studentsList.length === 0) {
                    this.setState({noStudentAlert: true});
                }
            }));
        
        
        /*
        const data = [{date: '2019-1-1', userID: {name: 'test'}}, {date: '2019-1-2', userID: {name: 'test2'}}, {date: '2019-1-3', userID: {name: 'haha'}}, {date: '2019-1-1', userID: {name: 'test'}}, {date: '2019-1-1', userID: {name: 'test'}}];
        this.setState({studentsList: data});
        */
    }
    
    handleSubmit() {
        const { classId } = this.props.match.params;

        if (this.props.auth.isAuthenticated) {
            const newUserClassPair = {};
            newUserClassPair.userID = this.props.auth.user.id;
            newUserClassPair.classID = classId;

            const url = '/api/register-class';
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(newUserClassPair),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => this.setState({successRedirect: data}));
        }
        else {
            this.setState({loginRequired: true});
            setTimeout(() => {
                this.props.history.push("/login"); 
            }, 2000);
        }
    }

    handleWithdraw() {
        const { classId } = this.props.match.params;

        if (this.props.auth.isAuthenticated) {
            const newUserClassPair = {};
            newUserClassPair.userID = this.props.auth.user.id;
            newUserClassPair.classID = classId;

            const url = '/api/drop-class';
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(newUserClassPair),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => this.setState({successRedirect: data}));
        }
        else {
            this.setState({loginRequired: true});
            setTimeout(() => {
                this.props.history.push("/login"); 
            }, 2000);
        }
    }

    componentDidMount() {
        
        const { classId } = this.props.match.params;
        const url = '/api/classes/' + classId;
        fetch(url)
			.then(response => response.json())
            .then(data => this.setState({currentClass: data}))
        
        /*
        const data = {"_id":"5c8547511c9d44000024fb63","name":"Piano","description":"Piano","price":75,"proposedSchedule":"Monday","instructor":"5c854805e0c8200000afd73a","rating":"9.6","cateogry":"Art"};
        this.setState({currentClass: data});
        */
    }
    
    render() {
        const classData = this.state.currentClass;
        const studentData = this.state.studentsList.map(function(data, index) {
            return <StudentDisplay key={index} name={data.userID.name} signupDate={data.date} />
        });

        if (this.state.successRedirect.result === 'success') {

        }
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
                                <LinkContainer to={'/instructor/' + classData.instructorID} className='instructor-link'><h5>{classData.instructorName}</h5></LinkContainer>
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
                        <div className='alerts-container'>
                            { this.state.successRedirect.status === 'success' ? <Alert variant='success' className='success-alert'>You have successfully {this.state.successRedirect.result} this class!</Alert> : null }  
                            { this.state.successRedirect.status === 'error' ? <Alert variant='danger' className='error-alert'>Oops, it seems that we have encountered a problem: {this.state.successRedirect.result}</Alert> : null }
                            { this.state.loginRequired ? <Alert variant='danger' className='login-alert'>It seems that you have not logged in. We are now taking you to the log in page.</Alert> : null }
                            { this.state.noStudentAlert ? <Alert variant='warning' className='no-student-alert'>There are no registered students for this class.</Alert> : null }
                        </div>
                    </Row>
                    <Row>
                        <div className='detail-buttons-container'>
                            <Button onClick={this.handleSubmit} variant="info">Register now!</Button>
                            <Button onClick={this.handleWithdraw} variant="warning">Withdraw from Class</Button>
                            <Button onClick={this.getStudents} variant="info">See Registered Students</Button>
                            <Button variant="info" disabled>Contact Instructor (Coming Soon)</Button>
                        </div>
                    </Row>
                    <Row>
                        <div className='detail-comments-container'>
                        </div>
                    </Row>
                    <Row>
                        <div className='student-list-container'>
                            {studentData}
                        </div>
                    </Row>
                </div>
            </div>
        )
    }
}

ClassDetail.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ClassDetail);