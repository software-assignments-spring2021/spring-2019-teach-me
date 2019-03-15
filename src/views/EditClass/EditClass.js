//https://www.robinwieruch.de/react-fetching-data/
import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'

import './EditClass.css'

class EditClass extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  	console.log(this.props.match.params.classId);
  }

  render() {
	return (
		<div id='edit-form'>
			<h3>Edit the Class</h3>
     		<form method="post" action="">
	 			<label>Name</label><br />
				<input type="text" name="name" value="intro to javascript" required /><br />
				<label>Description</label><br />
				<input type="text" name="description" value="learning programming with the best programming language ever! (haha no..." required /><br />
				<label>Price</label><br />
				<input type="number" name="price" value="123" required /><br />
				<label>Proposed Schedule</label><br />
				<input type="text" name="proposedSchedule" value="Saturdays 3-5pm" required /><br />
				<label>Category</label><br />
				<input type="text" name="category" value="Technology" required /><br />
				<input type="submit" value="Publish" />
				<a href="#">
				<input type="button" value="Cancel" />
				</a>
			</form>
		</div>
	);
  }


}


export default EditClass;
