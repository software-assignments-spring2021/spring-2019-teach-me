//https://www.robinwieruch.de/react-fetching-data/
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron'

import './CreateClass.css'

class CreateClass extends Component {

	constructor(props) {
		super(props);
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);

		this.state = {
			successRedirect: undefined
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		const newClassData = new FormData(e.target);
		const newClassObj = {};

		for (let userInput of newClassData.entries()) {
			newClassObj[userInput[0]] = userInput[1];
		}
		
		const { instructorId } = this.props.match.params;
		newClassObj.instructorId = instructorId;
		console.log(newClassObj);
		
		fetch('/api/create-class/', {
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
		else {
			return (
				<div id='submit-form'>
					<h3>Create a Class</h3>
					<form onSubmit={this.handleSubmit}>
						<label>Name</label><br />
						<input type="text" name="name" required /><br />
						<label>Description</label><br />
						<input type="text" name="description" required /><br />
						<label>Price</label><br />
						<input type="number" name="price" required /><br />
						<label>Proposed Schedule</label><br />
						<input type="text" name="proposedSchedule" required /><br />
						<label>Category</label><br />
						<input type="text" name="category" required /><br />
						<input type="submit" value="Publish" />
						<input type="button" value="Cancel" onClick={this.handleCancel} />
					</form>
				</div>
			);
		}
	}
}

export default CreateClass;