//https://www.robinwieruch.de/react-fetching-data/
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import './EditClass.css'

class EditClass extends Component {

	constructor(props) {
		super(props);

		this.state = {
			class: {},
			successRedirect: undefined
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	componentDidMount() {
    // If not logged in and user navigates to Edit Class page, should redirect them to login
	    if (this.props.auth.isAuthenticated) {
			// console.log(this.props.auth);
			const { classId } = this.props.match.params;
			const url = '/api/edit-class/' + classId;
			console.log(url);
			fetch(url)
				.then(response => response.json())
				.then(data => this.setState({class: data[0]}))
		}
		else {
			this.props.history.push("/login");
		}
	}

	handleSubmit(e) {

		e.preventDefault();
		const newClassData = new FormData(e.target);
		const newClassObj = {};

		for (let userInput of newClassData.entries()) {
			newClassObj[userInput[0]] = userInput[1];
		}

		console.log(newClassObj);

		const { classId } = this.props.match.params;
		const url = '/api/edit-class/' + classId;
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(newClassObj),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => response.json())
			.then(data => this.setState({successRedirect: data}));
	}

	handleCancel(e) {
		this.setState({successRedirect: {"result": "cancelled"}});
	}

	render() {
		if (this.state.successRedirect && (this.state.successRedirect.result === 'success' || this.state.successRedirect.result === 'cancelled')) {
			return (
				<Redirect to='/home' />
			)
		}
		else if (this.state.class.instructor !== this.props.auth.user.id) {
			return (
				<div id='alert'>
					<Alert variant='danger'>"You are not the instructor of this class so you don not have the permission to edit it."</Alert>
				</div>
			)

		}
		else {
			return (
				<div id='edit-form'>
					<h3>Edit the Class</h3>
					<form onSubmit={this.handleSubmit}>
						<label>Name</label><br />
						<input type="text" name="name" defaultValue={this.state.class.name} required /><br />
						<label>Description</label><br />
						<input type="text" name="description" defaultValue={this.state.class.description} required /><br />
						<label>Price</label><br />
						<input type="number" name="price" defaultValue={this.state.class.price} required /><br />
						<label>Proposed Schedule</label><br />
						<input type="text" name="proposedSchedule" defaultValue={this.state.class.proposedSchedule} required /><br />
						<label>Category</label><br />
						<input type="text" name="category" defaultValue={this.state.class.category} required /><br />
						<input type="submit" value="Publish" />
						<input type="button" value="Cancel" onClick={this.handleCancel} />
					</form>
				</div>
			);
		}
	}


}


EditClass.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(EditClass);
