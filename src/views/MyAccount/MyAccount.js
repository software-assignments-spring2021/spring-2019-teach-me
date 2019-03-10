//https://www.robinwieruch.de/react-fetching-data/
import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'

import './MyAccount.css'

class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      IsReadOnly: true,
      imageIsReadOnly: true,
      value: 'roger'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }
  handleChange(event) {
    this.setState({value:event.target.value});
  }

  handleSubmit(event) {
    alert('A new profile is submitted! ');
    event.preventDefault();
  }

  handleEditClick(event) {
    this.setState({IsReadOnly:false});
  }

  render() {
    return (
      <div className='myaccount-page'>
        <h3>My Account Page</h3><br />

        <form onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input type = "text" name = "name" value = {this.state.value} readOnly={this.state.IsReadOnly}
        onChange = {this.handleChange} required/>
        <input type = "button" name = "editname" value = "Edit" onClick={this.handleEditClick} /><br />
        <label>Email</label>
        <input type = "text" name = "email" value = "roger@gmail.com" readOnly={this.state.IsReadOnly}
        onChange = {this.handleChange} required/>
        <input type = "button" name = "editemail" value = "Edit" onClick={this.handleEditClick}/><br />
        <input type = "submit" value = "Submit"/>
        </form>

        <input type = "button" name = "viewclasshistory" value = "View Class History"/>


      </div>
    );
  }


}


export default MyAccount;
