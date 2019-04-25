//https://www.robinwieruch.de/react-fetching-data/
import React, { Component } from "react";
import { Link } from "react-router-dom";
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
			user: {},
			successCheck: undefined,
			instructorRating: 0.0,
			learnerRating: 0.0
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
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

	handleSubmit(event) {
		this.setState({ successCheck: { result: "success" } });
		alert("A new profile is submitted! ");
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

	fileSelectedHandler() {}

	render() {
		return (
			<div id="myaccount-page">
				<Jumbotron>
					<h3>My Account Page</h3>
					<br />
				</Jumbotron>
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
					<lable>Rating as Insturctor</lable>
					<Rater
						total={5}
						rating={this.state.user.instructorRating}
						interactive={false}
					/>
					<br />
					<lable>Rating as Learner</lable>
					<Rater
						total={5}
						rating={this.state.user.learnerRating}
						interactive={false}
					/>
					<br />
					<input
						type="button"
						name="edit"
						value="Edit"
						onClick={this.handleEditClick}
					/>
					<input type="submit" value="Submit" />
					<input type="file" onClick={this.fileSelectedHandler} />
				</form>

				<input
					type="button"
					name="viewclasshistory"
					value="View Class History"
					onClick={this.handleClassHistory}
				/>
				<input
					type="button"
					name="logout"
					value="Log out"
					onClick={this.handleLogOut}
				/>
			</div>
		);
	}
}
MyAccount.propTypes = {
	auth: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(MyAccount);