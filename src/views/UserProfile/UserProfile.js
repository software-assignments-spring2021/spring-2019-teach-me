import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert';
import Pagination from "react-js-pagination";
import { ClassDisplay } from '../../components/ClassDisplay';
import Rater from 'react-rater'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import './UserProfile.css'

class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: {},
            classesTaken: [],
            activePage: 1,
            noClassWarning: false,
            ratingSubmitStatus: {}
        };

        this.rateLearner = this.rateLearner.bind(this);
    }


    componentDidMount() {
        const { userId } = this.props.match.params;
        const url = '/api/my-account/' + userId;
        console.log(url);
        fetch(url)
          .then(response => response.json())
          .then(data => this.setState({currentUser:data[0]}))
        
        // const data = {"sumOfRatingAsInstructor":0,"numOfRatingAsInstructor":0,"sumOfRatingAsLearner":0,"numOfRatingAsLearner":0,"_id":"5cafbea33b93c520a141dfa7","name":"test","email":"hi@test.com","password":"$2a$10$tL1NRESoZ8sfZRhxvOOpHeL17yDi5cHLS98XZVVUWAU6U89di/Tsi","date":"2019-04-11T22:24:35.651Z","__v":0,"instructorRating":0,"learnerRating":0};
        // this.setState({currentUser: data});
        // console.log(data.Introduction);

        const url2 = '/api/class-history-take/' + userId;
        console.log(url2);
        fetch(url2)
            .then(response => response.json())
            .then((data) => {
                if (data.length === 0) {
                    this.setState({noTakeClassWarning: true, classesTaken: data});
                }
                else {
                    this.setState({noTakeClassWarning: false, classesTaken: data});
                }
            });

        // const data2 = [{"_id":"5c8547511c9d44000024fb63","name":"Piano","description":"Piano","price":10,"proposedSchedule":"Monday","instructor":{"sumOfRatingAsInstructor":-1,"numOfRatingAsInstructor":-1,"sumOfRatingAsLearner":0,"numOfRatingAsLearner":0,"profilePicURL":"/images/default-user.png","profilePicPublicID":null,"_id":"5cae87f7241167dc0675a704","name":"DerekTest","email":"ch2699@nyu.edu","password":"$2a$10$i8zH3LVNTJ/.My/Ms0PsgOCQshBTRbAKCJ5gCWKJ/VNDJvij7PpSC","date":"2019-04-11T00:19:03.364Z","__v":0},"rating":"9.6","category":"Music","archive":false,"complete":false,"instructorName":"DerekTest","instructorProfilePic":"/images/default-user.png"},{"_id":"5cb12adbb5966c04c0927891","name":"violin","description":"learn how to play violin","price":100,"proposedSchedule":"Mon, Wed 1-2pm","instructor":{"sumOfRatingAsInstructor":0,"numOfRatingAsInstructor":0,"sumOfRatingAsLearner":42,"numOfRatingAsLearner":10,"profilePicURL":"/images/default-user.png","profilePicPublicID":null,"_id":"5cafbea33b93c520a141dfa7","introduction":"hello","name":"test","email":"hi@test.com","password":"$2a$10$tL1NRESoZ8sfZRhxvOOpHeL17yDi5cHLS98XZVVUWAU6U89di/Tsi","date":"2019-04-11T22:24:35.651Z","__v":0},"category":"Music","rating":0,"sumOfRating":0,"numOfRating":0,"archive":false,"__v":0,"complete":false,"instructorName":"test","instructorProfilePic":"/images/default-user.png"}];
        // this.setState({classesTaken: data2});
        // if (data2.length === 0) {
        //     this.setState({noClassWarning: true});
        // } 
    }

    rateLearner(e) {

        if (this.props.auth.isAuthenticated) {

            console.log(e.rating);

            const newRatingObj = {};

            const newSumOfRatingAsLearner = this.state.currentUser.sumOfRatingAsLearner + e.rating;
            console.log(newSumOfRatingAsLearner);
            newRatingObj.newSumOfRatingAsLearner = newSumOfRatingAsLearner;
            const newNumOfRatingAsLearner = this.state.currentUser.numOfRatingAsLearner + 1;
            console.log(newNumOfRatingAsLearner);
            newRatingObj.newNumOfRatingAsLearner = newNumOfRatingAsLearner;

            const userId = this.props.match.params.userId;
            newRatingObj.userId = userId;
            const instructorId = this.props.auth.user.id;
            newRatingObj.instructorId = instructorId;
            console.log(newRatingObj);

            fetch("/api/rate-learner/", {
                method: "POST",
                body: JSON.stringify(newRatingObj),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => this.setState({ ratingSubmitStatus: data }));
        }
        else {
            this.props.history.push("/login");
        }
    }

    handlePageChange(pg) {
        this.setState({activePage: pg});
    }

    render() {
        const { classId } = this.props.match.params;
        const userData = this.state.currentUser;

        const classListData = this.state.classesTaken.map(function(data, index) {
            return <ClassDisplay key={index} title={data.name} description={data.description} price={data.price} instructor={data.instructorName} rating={data.rating} category={data.category} slug={data._id} instructorProfilePic={data.instructorProfilePic}/>
        });
        
        const CLASSES_PER_PAGE = 4;

        const startIdx = (this.state.activePage - 1) * CLASSES_PER_PAGE;
        const endIdx = startIdx + CLASSES_PER_PAGE;
        const toDisplay = classListData.slice(startIdx, endIdx);
        const pageRange = Math.min(5, classListData.length/CLASSES_PER_PAGE + 1);

        return (
            <div className='detail-page-container'>
                <Jumbotron>
                    <h1>Profile: {userData.name}</h1>
                </Jumbotron>
                <div className='detail-container'>
                    <Row>
                        <Col sm={5}>
                            <div className='detail-image-container'>
                                <img
                                    alt="user profile"
                                    src={userData.profilePicURL}
                                    className="user-image"
                                />
                            </div>
                        </Col>
                        <Col sm={7}>
                            <div className="detail-text-container">
                                <h3>Name</h3>
                                <p>{userData.name}</p>
                                <h3>Email</h3>
                                <p>{userData.email}</p>
                                <h3>Introduction</h3>
                                { userData.introduction === undefined ? <p>[This user has not provided introduction.] </p> : <p>{userData.introduction}</p> }
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className='rating-container'>
                            <h3>Rating</h3>
                            <Rater total = {5} rating = {userData.learnerRating} interactive = {false}/>
                            <p>Rate this learner: </p>
                            <Rater total={5} onRate={this.rateLearner} />
                            {this.state.ratingSubmitStatus.status ===
                            "success" ? (
                                <Alert
                                    variant="success"
                                    className="success-alert"
                                >
                                    You have successfully submitted your
                                    rating!
                                </Alert>
                            ) : null}
                            {this.state.ratingSubmitStatus.status ===
                            "error" ? (
                                <Alert
                                    variant="danger"
                                    className="error-alert"
                                >
                                    Oops, it seems that we have encountered
                                    a problem:{" "}
                                    {this.state.ratingSubmitStatus.result}.
                                </Alert>
                            ) : null}
                        </div>
                    </Row>
                    <Row>
                        <div className='class-history-container'>
                            <h3>Classes Taken by {userData.name}</h3>
                            {toDisplay}
                            { this.state.noClassWarning ? <Alert variant='danger'>It seems that the user have not taken any class at this time.</Alert> : null }
                            <div className='pagination-container'>
                                <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={CLASSES_PER_PAGE}
                                    totalItemsCount={classListData.length}
                                    pageRangeDisplayed={pageRange}
                                    onChange={this.handlePageChange.bind(this)}
                                />
                            </div>
                        </div>
                    </Row>
                </div>
            </div>
        )
    }
}


UserProfile.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(UserProfile);