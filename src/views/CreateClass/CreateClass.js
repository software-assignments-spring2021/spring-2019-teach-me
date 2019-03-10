//https://www.robinwieruch.de/react-fetching-data/
import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'

import './CreateClass.css'


const CreateClass = props => {
	return (
	<div id='create-form'>
     <h3>Create a Class</h3>
     <form method="post" action="">
	 <label>Name</label><br />
	 <input type="text" name="name" required /><br />
	 <label>Description</label><br />
	 <input type="text" name="description" required /><br />
	 <label>Price</label><br />
	 <input type="number" name="price" required /><br />
	 <label>Proposed Schedule</label><br />
	 <input type="text" name="proposedSchedule" required /><br />
	 <input type="submit" value="Publish" />
	 <a href="#">
	   <input type="button" value="Cancel" />
	 </a>
     </form>
    </div>
	);
};

export default CreateClass;