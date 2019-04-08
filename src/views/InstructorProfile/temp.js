/*
import React, { Component } from 'react';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

import './InstructorProfile.css'

class InstructorProfile extends Component {
  render() {
    
    const {instructor} = this.state;
    if (instructor.name === undefined) {
        return <div className='instructor-profile-page'><h4>Loading...</h4></div>
    }
    return (
      
      <div className='instructor-profile-page'>
        <h3 className='title'>Instructor {instructor.name}</h3>
        <h4>Students Rating</h4>
        <Rater
            total={5} 
            rating={this.instructorRating()}
        />
        <hr/>
        <h4>Description</h4>
        <p>{instructor.description}</p>
        <hr />
        <div>
          <strong>Rating:</strong>  He/She is a <Rater total={5} onRate={this.rateInstructor()} /> Instructor.
        </div>
        <hr />
        <h4>Comments</h4>
      </div>
    );
  }


}


export default InstructorProfile;



*/
