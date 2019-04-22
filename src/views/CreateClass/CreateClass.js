//https://www.robinwieruch.de/react-fetching-data/
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";

import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import validator from 'validator';


import "./CreateClass.css";

class CreateClass extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleUrl = this.handleUrl.bind(this);

		this.state = {
			successRedirect: undefined,
			urlError: ''
		};
	}

	componentDidMount() {
		// If not logged in and user navigates to Create Class page, should redirect them to login
		if (this.props.auth.isAuthenticated) {
			//console.log(this.props.auth);
		} else {
			this.props.history.push("/login");
		}
	}

	handleUrl(e) {
		const userUrl = e.target.value;

		if (!validator.isURL(userUrl)) {
			this.setState({urlError: 'That is not a valid url. Please try again'});
		} else {
			this.setState({urlError: ''});
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		const newClassData = new FormData(e.target);
		const newClassObj = {};

		for (let userInput of newClassData.entries()) {
			newClassObj[userInput[0]] = userInput[1];
		}

		const instructorId = this.props.auth.user.id;
		newClassObj.instructorId = instructorId;
		console.log(newClassObj);

		fetch("/api/create-class/", {
			method: "POST",
			body: JSON.stringify(newClassObj),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => this.setState({ successRedirect: data }));
	}

	handleCancel(e) {
		this.setState({ successRedirect: { result: "cancelled" } });
	}

	render() {
		if (
			this.state.successRedirect &&
			(this.state.successRedirect.result === "success" ||
				this.state.successRedirect.result === "cancelled")
		) {
			return <Redirect to="/class-history" />;
		} else {
			return (
				<div id="submit-form">
					<h3>Create a Class</h3>
					<form onSubmit={this.handleSubmit}>
						<label>Name</label>
						<br />
						<input type="text" name="name" required />
						<br />
						<label>Description</label>
						<br />
						<input type="text" name="description" required />
						<br />
						<label>Price</label>
						<br />
						<input type="number" name="price" required />
						<br />
						<label>Proposed Schedule</label>
						<br />
						<input type="text" name="proposedSchedule" required />
						<br />
						<label>Category</label>
						<br />
						<input type="text" name="category" required />
						<br />
						<label>Payment Link</label>
						<br />
						<input type="text" onBlur={this.handleUrl} name="paymentLink" />
						<label id='urlError'>{this.state.urlError}</label><br />
						<input type="submit" value="Publish" />
						<input
							type="button"
							value="Cancel"
							onClick={this.handleCancel}
						/>
					</form>
				</div>
			);
		}
	}
}

CreateClass.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(CreateClass);