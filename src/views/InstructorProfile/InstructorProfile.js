
import React, { Component } from 'react';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

import './InstructorProfile.css'

class InstructorProfile extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
        instructor:  {}
    };
  }

  instructorRating() {
    
    const {sumOfRating, numOfRating } = this.state.instructor
    return sumOfRating / numOfRating
  }


  rateInstructor(rating) {
    
    const {instructorId} = this.props.match.params;
    fetch('/api/instructor/' + instructorId + '/rating', {
        method: 'POST',
        body: rating,
    }).then(response => {})
  }

  addComment(comment) {
    
    const {instructorId} = this.props.match.params;
    fetch('/api/instructor/' + instructorId + '/add_comment', {
        method: 'POST',
        body: comment,
    }).then(response => {})
  }

  componentDidMount() {
    
    const {instructorId} = this.props.match.params;
    fetch('/api/instructor/' + instructorId + '/info')
        .then(response => response.json())
        .then(data => this.setState({instructor: data}))
  }

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
        <br/>
        {
            
            instructor.comments === undefined ?  (
            <div className='no-comments'>No comments yet.</div>)  :
            (instructor.comments.map(comment => 
                <div className='comment'>
                    <span className='comment-name'>{comment.name}</span><br/>
                    <span className='comment-content'>{comment.content}</span><br/>
                    <span className='comment-date'>{comment.date}</span>
                </div>))
    
        }
      </div>
    );
  }


}


export default InstructorProfile;
