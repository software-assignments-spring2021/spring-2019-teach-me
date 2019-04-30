import React, { Component } from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

import "./InstructorProfile.css";

class InstructorProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			instructor: {}
		};
	}

	instructorRating() {
		const {
			sumOfRatingAsInstructor,
			numOfRatingAsInstructor
		} = this.state.instructor;
		return sumOfRatingAsInstructor / numOfRatingAsInstructor;
	}

	rateInstructor(rating) {
		const { userId } = this.props.match.params;
		fetch("/api/instructor/" + userId + "/rating", {
			method: "POST",
			body: rating
		}).then(response => {});
	}

	addComment(comment) {
		const { userId } = this.props.match.params;
		fetch("/api/instructor/" + userId + "/add_comment", {
			method: "POST",
			body: comment
		}).then(response => {});
	}

	componentDidMount() {
		const { userId } = this.props.match.params;
		fetch("/api/instructor/" + userId + "/info")
			.then(response => response.json())
			.then(data => this.setState({ instructor: data[0] }));
	}

	render() {
		const { instructor } = this.state;
		if (instructor.name === undefined) {
			return (
				<div className="instructor-profile-page">
					<h4>Loading...</h4>
				</div>
			);
		}
		return (
			<div className="instructor-profile-page">
				<h3 className="title">Instructor {instructor.name}</h3>
				<h4>Students Rating</h4>
				<Rater total={5} rating={this.instructorRating()} />
				<hr />
				<h4>Description</h4>
				<p>{instructor.description}</p>
				<hr />
				<hr />
				<h4>Comments</h4>
				<br />
				{instructor.comments === undefined ? (
					<div className="no-comments">No comments yet.</div>
				) : (
					instructor.comments.map(comment => (
						<div className="comment">
							<span className="comment-name">{comment.name}</span>
							<br />
							<span className="comment-content">
								{comment.content}
							</span>
							<br />
							<span className="comment-date">{comment.date}</span>
						</div>
					))
				)}
			</div>
		);
	}
}

export default InstructorProfile;