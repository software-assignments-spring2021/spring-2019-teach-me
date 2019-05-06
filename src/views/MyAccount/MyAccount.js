//https://www.robinwieruch.de/react-fetching-data/
import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Rater from "react-rater";

import "./MyAccount.css";

class MyAccount extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userId: undefined,
			IsReadOnly: true,
			imageIsReadOnly: true,
			pleaseWait: false,
			user: {},
			profileUploadSuccess: {},
			successCheck: {},
			instructorRating: 0.0,
			learnerRating: 0.0
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleIntroductionChange = this.handleIntroductionChange.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleClassHistory = this.handleClassHistory.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
		this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.setState({ userId: this.props.auth.user.id }, function() {
				const url = "/api/my-account/" + this.state.userId;
				fetch(url)
					.then(response => response.json())
					.then(data => this.setState({ user: data[0] }));
			});
		} else {
			this.props.history.push("/login");
		}

		//console.log(this.state.userName);
	}

	calculateRating() {
		if (this.state.user.numOfRatingAsInstructor > 0) {
			this.setState({
				instructorRating:
					(this.state.user.sumOfRatingAsInstructor * 1.0) /
					this.state.user.numOfRatingAsInstructor
			});
		}
		if (this.state.user.numOfRatingAsLearner > 0) {
			this.setState({
				learnerRating:
					(this.state.user.sumOfRatingAsInstructor * 1.0) /
					this.state.user.numOfRatingAsInstructor
			});
		}
	}

	handleNameChange(event) {
		let newUser = this.state.user;
		newUser.name = event.target.value;
		this.setState({ user: newUser });
	}

	handleEmailChange(event) {
		let newUser = this.state.user;
		newUser.email = event.target.value;
		this.setState({ user: newUser });
	}

	handleIntroductionChange(event) {
		let newUser = this.state.user;
		newUser.introduction = event.target.value;
		this.setState({ user: newUser });
	}

	handleSubmit(event) {
		/*
		this.setState({ successCheck: { result: "success" } });
		alert("A new profile is submitted! ");
		*/
		event.preventDefault();

		const newUserData = new FormData(event.target);
		const newUserObj = {};

		for (let userInput of newUserData.entries()) {
			newUserObj[userInput[0]] = userInput[1];
		}

		const url = "/api/my-account/" + this.state.userId;
		fetch(url, {
			method: "POST",
			body: JSON.stringify(newUserObj),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			}
		})
			.then(response => response.json())
			.then(data => this.setState({ successCheck: data }));

		this.setState({ IsReadOnly: true });
	}

	handleEditClick(event) {
		this.setState({ IsReadOnly: false });
	}

	handleClassHistory(event) {
		this.props.history.push("/class-history");
	}

	handleLogOut(event) {
		this.props.history.push("/dashboard");
	}

	fileSelectedHandler(e) {
		this.setState({pleaseWait: true});

		const formData = new FormData();
		formData.append('profile-pic', e.target.files[0]);
		//console.log(formData);
		//console.log(e.target.files);

		const url = '/api/images/' + this.state.userId;
		fetch(url, {
			method: 'POST',
			body: formData
		}).then(res => res.json())
		.then(data => this.setState({profileUploadSuccess: data, pleaseWait: false}));
	}

	render() {
		return (
			<div id="myaccount-page">
				<Jumbotron>
					<h1>Welcome {this.state.user.name}</h1>
					<p>You can view and change your account information here.</p>
				</Jumbotron>
				<div class='my-account-container'>
					<Row>
						<Col sm={5}>
							<div className="detail-image-container">
								<h3>My Profile Picture</h3>
								<img
									alt="my profile"
									src={this.state.user.profilePicURL}
									className="instructor-image"
								/>
								<h5>Change My Profile Picture:</h5>
								<p className='italics-text'>Please upload only jpg, jpeg and png files. A square image is recommended as your image will be automatically resized to 110px * 110px.</p>
								{ this.state.pleaseWait ? <Alert variant='info' className='success-alert'>Please wait while we upload your image...</Alert> : null }
								{ this.state.profileUploadSuccess.result === 'success' ? <Alert variant='success' className='success-alert'>You have successfully uploaded a new profile image! Refresh the page to see the changes.</Alert> : null }
								<input type="file" name="profile-pic" onChange={this.fileSelectedHandler} />
							</div>
						</Col>
						<Col sm={7}>
							<div className="detail-text-container">
								<div className="my-personal-info">
									<h3>My Personal Info</h3>
									<form onSubmit={this.handleSubmit}>
										<label>Name</label>
										<input
											type="text"
											name="name"
											value={this.state.user.name}
											readOnly={this.state.IsReadOnly}
											onChange={this.handleNameChange}
											required
										/>
										<br />
										<label>Email</label>
										<input
											type="text"
											name="email"
											value={this.state.user.email}
											readOnly={this.state.IsReadOnly}
											onChange={this.handleEmailChange}
											required
										/>
										<br />
										<label>Self Introduction</label>
										<input
											type="text"
											name="introduction"
											value={this.state.user.introduction}
											readOnly={this.state.IsReadOnly}
											onChange={this.handleIntroductionChange}
											required
										/>
										<br />
										<div className='edit-info-buttons'>
											{ this.state.successCheck.result === 'success' ? <Alert variant='success' className='success-alert'>You have successfully edited your personal info!</Alert> : null }
											<Button onClick={this.handleEditClick} variant='info'>
												Edit My Personal Info
											</Button>
											<Button type='submit' variant='primary'>
												Save Changes
											</Button>
										</div>
										{/*<input type="submit" value="Submit" />*/}
									</form>
								</div>
								<div class="my-ratings">
									<h3>My Ratings</h3>
									<h5>Rating as Insturctor</h5>
									<Rater
										total={5}
										rating={this.state.user.instructorRating}
										interactive={false}
									/>
									<br />
									<h5>Rating as Learner</h5>
									<Rater
										total={5}
										rating={this.state.user.learnerRating}
										interactive={false}
									/>
								</div>
							</div>
						</Col>
					</Row>	
					<Row>
						<div className='other-page-buttons'>
							<Button onClick={this.handleClassHistory} variant='info'>
								View My Class History
							</Button>
							<Button onClick={this.handleLogOut} variant='warning'>
								Log Out
							</Button>
						</div>
					</Row>
				</div>
			</div>
		);
	}
};

MyAccount.propTypes = {
	auth: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(MyAccount);