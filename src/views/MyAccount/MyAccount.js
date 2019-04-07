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
      userName: '',
      userEmail: '',
      successCheck: undefined
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    const url = '/api/my-account/' + userId;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({userName: data.name}, {userEmail: data.email}))
      console.log(this.state.userName);
  }




  handleNameChange(event) {
    this.setState({userName:event.target.value});
  }

  handleEmailChange(event) {
    this.setState({userEmail:event.target.value});
  }

  handleSubmit(event) {
    alert('A new profile is submitted! ');
    this.setState({successCheck: {"result": "success"}});
    event.preventDefault();
    const newUserData = new FormData(event.target);
    const newUserObj = {};

    for(let userInput of newUserData.entries()) {
      newUserObj[userInput[0]] = userInput[1];
    }
    console.log(newUserObj);

    const { userId } = this.props.match.params;
    const url = '/api/my-account/' + userId;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(newUserObj),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => this.setState({successCheck: data}));

  }

  handleEditClick(event) {
    this.setState({IsReadOnly:false});
  }

  render() { console.log(this.state.userEmail);
    return (
      <div className='myaccount-page'>
        <h3>My Account Page</h3><br />

        <form onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input type = "text" name = "name" value = {this.state.userName} readOnly={this.state.IsReadOnly}
        onChange = {this.handleNameChange} required/>
        <input type = "button" name = "editname" value = "Edit" onClick={this.handleEditClick} /><br />
        <label>Email</label>
        <input type = "text" name = "email" value = {this.state.userEmail} readOnly={this.state.IsReadOnly}
        onChange = {this.handleEmailChange} required/>
        <input type = "button" name = "editemail" value = "Edit" onClick={this.handleEditClick}/><br />
        <input type = "submit" value = "Submit"/>
        </form>

        <input type = "button" name = "viewclasshistory" value = "View Class History"/>


      </div>
    );
  }


}


export default MyAccount;
