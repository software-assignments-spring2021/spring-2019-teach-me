//https://www.robinwieruch.de/react-fetching-data/
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron'

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
		const { classId } = this.props.match.params;
		const url = '/api/edit-class/' + classId;
		console.log(url);
		fetch(url)
			.then(response => response.json())
			.then(data => this.setState({class: data[0]}))
	}

	handleSubmit(e) {
		this.setState({successRedirect: {"result": "success"}});
		console.log(e.target);

		e.preventDefault();
		const newClassData = new FormData(e.target);
		const newClassObj = {};

		for (let userInput of newClassData.entries()) {
			newClassObj[userInput[0]] = userInput[1];
		}

		console.log(newClassObj);

		// fetch('/api/edit-class/', {
		// 	method: 'POST',
		// 	body: JSON.stringify(newClassObj),
		// 	headers: {
		// 	'Content-Type': 'application/json'
		// }
		// }).then(response => response.json())
		// 	.then(data => this.setState({successRedirect: data}));
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
				<div id='edit-form'>
					<h3>Edit the Class</h3>
					<form onSubmit={this.handleSubmit}>
						<label>Name</label><br />
						<input type="text" name="name" value={this.state.class.name} required /><br />
						<label>Description</label><br />
						<input type="text" name="description" value={this.state.class.description} required /><br />
						<label>Price</label><br />
						<input type="number" name="price" value={this.state.class.price} required /><br />
						<label>Proposed Schedule</label><br />
						<input type="text" name="proposedSchedule" value={this.state.class.proposedSchedule} required /><br />
						<label>Category</label><br />
						<input type="text" name="category" value={this.state.class.category} required /><br />
						<input type="submit" value="Publish" />
						<input type="button" value="Cancel" onClick={this.handleCancel} />
						
					</form>
				</div>
			);
		}
	}


}


export default EditClass;
