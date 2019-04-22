//https://www.robinwieruch.de/react-fetching-data/
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import validator from 'validator';

import './EditClass.css'

class EditClass extends Component {

	constructor(props) {
		super(props);

		this.state = {
			class: {},
			successRedirect: undefined,
			urlError: '',
			originator: new Originator(),
			careTaker: new CareTaker()
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);

		this.handleSave = this.handleSave.bind(this);
		this.handleRestore = this.handleRestore.bind(this);

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleProposedScheduleChange = this.handleProposedScheduleChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleUrl = this.handleUrl.bind(this);

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
				.then(data => {
					this.setState({class: data[0]});

					let originator = Object.assign({}, this.state.originator);
					originator.name = data[0].name; 
					originator.description = data[0].description;
					originator.price = data[0].price;
					originator.proposedSchedule = data[0].proposedSchedule;
					originator.category = data[0].category;
					originator.payment = data[0].payment;

					this.setState({originator});
				})
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

	handleNameChange(e) {
		let originator = Object.assign({}, this.state.originator);
		originator.name = e.target.value; 
		this.setState({originator});
	}

	handleDescriptionChange(e) {
		let originator = Object.assign({}, this.state.originator);
		originator.description = e.target.value; 
		this.setState({originator});
	}

	handlePriceChange(e) {
		let originator = Object.assign({}, this.state.originator);
		originator.price = e.target.value; 
		this.setState({originator});
	}

	handleProposedScheduleChange(e) {
		let originator = Object.assign({}, this.state.originator);
		originator.proposedSchedule = e.target.value; 
		this.setState({originator});
	}

	handleCategoryChange(e) {
		let originator = Object.assign({}, this.state.originator);
		originator.category = e.target.value; 
		this.setState({originator});
	}

	handleSave(e) {
		this.state.careTaker.SetMemento(this.state.originator.saveState());
		console.log(this.state.originator);
		console.log("save");
	}

	handleRestore(e) {
		this.state.originator.restoreState(this.state.careTaker.GetMemento());
		var output = "The values you previously saved are: \n" + 
		"Name: " + this.state.originator.name + "\n" +
		"Description: " + this.state.originator.description + "\n" +
		"Price: " + this.state.originator.price + "\n" +
		"Proposed Schedule: " + this.state.originator.proposedSchedule + "\n" +
		"Category: " + this.state.originator.category + "\n" +
		"Payment Link: " + this.state.originator.payment;
		alert(output);
		console.log(this.state.originator);
		console.log("restore");
	}

	handleUrl(e) {
		let originator = Object.assign({}, this.state.originator);
		originator.payment = e.target.value; 
		this.setState({originator});

		const userUrl = e.target.value;

		if (!validator.isURL(userUrl)) {
			this.setState({urlError: 'That is not a valid url. Please try again'});
		} else {
			this.setState({urlError: ''});
		}
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
					<Alert variant='danger'>"You are not the instructor of this class so you do not have the permission to edit it."</Alert>
				</div>
			)

		}
		else {
			return (
				<div id='edit-form'>
					<h3>Edit the Class</h3>
					<form onSubmit={this.handleSubmit}>
						<label>Name</label><br />
						<input type="text" name="name" defaultValue={this.state.class.name} onChange={this.handleNameChange} required /><br />
						<label>Description</label><br />
						<input type="text" name="description" defaultValue={this.state.class.description} onChange={this.handleDescriptionChange} required /><br />
						<label>Price</label><br />
						<input type="number" name="price" defaultValue={this.state.class.price} onChange={this.handlePriceChange} required /><br />
						<label>Proposed Schedule</label><br />
						<input type="text" name="proposedSchedule" defaultValue={this.state.class.proposedSchedule} onChange={this.handleProposedScheduleChange} required /><br />
						<label>Category</label><br />
						<input type="text" name="category" defaultValue={this.state.class.category} onChange={this.handleCategoryChange} required /><br />
						<label>Payment Link</label><br />
						<input type="text" onBlur={this.handleUrl} defaultValue={this.state.class.paymentLink} name="paymentLink" />
						<label id='urlError'>{this.state.urlError}</label><br />
						<input type="submit" value="Publish" />
						<input type="button" value="Cancel" onClick={this.handleCancel} />
						<input type="button" value="Save Draft" onClick={this.handleSave} />
						<input type="button" value="View Draft" onClick={this.handleRestore} />
					</form>
				</div>
			);
		}
	}


}


var Originator = function(){
	this.name = "" ;
	this.description = "" ;
	this.price = "" ;
	this.proposedSchedule = "" ;
	this.category = "" ;
	this.payment = "" ;

	this.saveState = function(){
		return new Memento(this)
	}
 
	this.restoreState = function(_obj){
		this.name = _obj.name ;
		this.description = _obj.description ;
		this.price = _obj.price ;
		this.proposedSchedule = _obj.proposedSchedule ;
		this.category = _obj.category ;
		this.payment = _obj.payment ;
	}
}

var Memento = function(_obj){
	this.name = _obj.name;
	this.description = _obj.description;
	this.price = _obj.price;
	this.proposedSchedule = _obj.proposedSchedule;
	this.category = _obj.category;
	this.payment = _obj.payment;
}

var CareTaker = function(){
	var conState = null;
	this.SetMemento = function(_conState){
		conState =  _conState;
	}
	this.GetMemento = function(){
		return conState;
	}
}


EditClass.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(EditClass);
