//https://www.robinwieruch.de/react-fetching-data/
import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'

import './ClassHistory.css'

class ClassHistory extends Component {
    constructor(props) {
      super(props);

      this.state = {
        myclasses: []
      };
      this.handleDelete = this.handleDelete.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(event) {

    }

    handleDelete(event) {

    }

  // Add later on when backend is done.
  /*  componentDidMount() {
      fetch('/api/classhistory')
        .then(response => response.json())
        .then(data => this.setState({myclasses: data}))
    }
  */

  render() {
    /*const myClassData = this.state.myclasses.map(function(data,index) {
      return <tr><td>{data.title}</td> <td>{data.description}</td>
      <td>{data.insturctor}</td> <td>{data.date}</td> <td>{data.review}</td>
      <td>{data.score}</td></tr>
    });*/  //Add after backend is done.

    return (
      <div className='classhistory-page'>
        <h3>My Class History</h3><br />
        <table>
        <tr><th>Title</th><th>Description</th><th>Instructor</th>
        <th>Date</th><th>Reviews</th><th>Score</th>
        </tr>
        </table>
        <input type = "button" name = "edit" value ="Edit" onClick = {this.handleEdit}/><br/>
        <input type = "button" name = "delete" value = "Delete" onClick = {this.handleDelete}/><br />
      </div>
    );
  }
}

export default ClassHistory;
