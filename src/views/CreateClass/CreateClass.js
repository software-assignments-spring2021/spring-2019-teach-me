//https://www.robinwieruch.de/react-fetching-data/
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

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
			successRedirect: {},
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
		//console.log(newClassObj);

		fetch("/api/create-class/", {
			method: "POST",
			body: JSON.stringify(newClassObj),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => this.setState({ successRedirect: data },  () => {
				if (this.state.successRedirect.result === 'success') {
					setTimeout(() => {
						const url = '/classes/' + this.state.successRedirect.newClassID;
						this.props.history.push(url);
					}, 3500);
				}
			}));
	}

	handleCancel(e) {
		this.setState({ successRedirect: { result: "cancelled" } });
	}

	render() {
		if (
			this.state.successRedirect && this.state.successRedirect.result === "cancelled"
		) {
			return <Redirect to="/class-history" />;
		} else {
			return (
				<div id="submit-form">
					<Jumbotron>
						<h1>Publish a New Class</h1>
						<p>Want to teach a new class? Fill in the details below and publish it!</p>
					</Jumbotron>
					<form className='create-class-form' onSubmit={this.handleSubmit}>
						<label>Name</label>
						<br />
						<input type="text" name="name" required />
						<br />
						<label>One-Sentence Description</label>
						<br />
						<input type="text" name="description" required />
						<label>Longer Description of the Class</label>
						<br />
						<input type="text" name="about" required />
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
						<select className="category-select" name="category">
							<option value="Art/Creative">Art/Creative</option>
							<option value="Music">Music</option>
							<option value="Technology">Technology</option>
							<option value="Language">Language</option>
							<option value="Sports">Sports</option>
							<option value="Lifestyle">Lifestyle</option>
							<option value="Business">Business</option>
							<option value="Miscellaneous">Miscellaneous</option>
						</select>
						<br />
						<label>Payment Link</label>
						<br />
						<input type="text" onBlur={this.handleUrl} name="paymentLink" />
						<label id='urlError'>{this.state.urlError}</label><br />
						{this.state.successRedirect.result === "success" ? <Alert variant="success">You have successfully published a new class! We are now taking you to the class detail page of your new class.</Alert> : null}
						<div className='create-class-buttons'>
							<Button type='submit' variant='primary'>
								Submit
							</Button>
							<Button type="button" onClick={this.handleCancel}>
								Cancel
							</Button>
						</div>
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