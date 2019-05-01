import React, { Component } from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Alert from "react-bootstrap/Alert";
import "./InstructorProfile.css";
import { Comment } from "../../components/Comment";

class InstructorProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			instructor: {},
			comments: [],
			noCommentAlert: true,
			textAreaValue: ""
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
			.then(data => {
				this.setState({ instructor: data[0] });
				this.getComments();
			});

	}

	getComments() {
		const { userId } = this.props.match.params;
		fetch("/api/instructor/" + userId + "/comments")
			.then(response => response.json())
			.then(data => {
				for (let item of data) {
					fetch("/api/comments/" + item._id)
					.then(response => response.json())
					.then(data => {
						data.map(function(comment, index) {
							comment['className'] = item.name;
						})
						this.setState({ comments: this.state.comments.concat(data) }, function() {
							if (this.state.comments.length === 0) {
								this.setState({
									noCommentAlert: true,
									textAreaValue: ""
								});
							} else {
								this.setState({
									noCommentAlert: false,
									textAreaValue: ""
								});
							}
				})
					});
				}
			});
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

		const commentData = this.state.comments.map(function(data, index) {
			return (
				<Comment
					key={index}
					name={data.name}
					className={data.className}
					commentText={data.commentText}
					commentDate={data.commentDate}
                    userID={data.userID}
                    userProfilePic={data.userProfilePic}
				/>
			);
		});

		return (
			<div className="instructor-profile-page">
				<h3 className="title">Instructor {instructor.name}</h3>
				<h4>Students Rating</h4>
				<Rater total={5} rating={this.instructorRating() interactive={false}} />
				<hr />
				<h4>Description</h4>
				<p>{instructor.description}</p>
				<hr />
				<hr />
				<br />
				<div className="detail-comments-container">
							<h3>Comments</h3>
							{commentData}
								{this.state.noCommentAlert ? (
									<Alert
										variant="warning"
										className="not-comment-alert"
									>
										There are no comments yet for this instructor.
									</Alert>
								) : null}
				</div>
			</div>
		);
	}
}

export default InstructorProfile;