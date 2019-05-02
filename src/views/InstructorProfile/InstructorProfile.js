import React, { Component } from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Alert from "react-bootstrap/Alert";
import "./InstructorProfile.css";
import { Comment } from "../../components/Comment";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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

	rateInstructor(event) {

		if(this.props.auth.isAuthenticated) {
			console.log(this.state.instructor)
			console.log(event.rating);

			const newRatingObj = {};

			const newSumOfRatingAsInstructor = this.state.instructor.sumOfRatingAsInstructor + event.rating;
			console.log(newSumOfRatingAsInstructor);
			newRatingObj.newSumOfRatingAsInstructor = newSumOfRatingAsInstructor;
			const newNumOfRatingAsInstructor = this.state.instructor.numOfRatingAsInstructor + 1;
			console.log(newNumOfRatingAsInstructor);
			newRatingObj.newNumOfRatingAsInstructor = newNumOfRatingAsInstructor;

			const instructorId = this.props.match.params.userId;
			newRatingObj.instructorId = instructorId;
			const userId = this.props.auth.user.id;
			newRatingObj.userId = userId;
			console.log(newRatingObj);

			fetch("/api/rate-instructor/", {
				method: "POST",
				body: JSON.stringify(newRatingObj),
				headers: {
					"Content-Type": "application/json"
				}
			})
					.then(response => response.json())
					.then(data => this.setState({rateSuccess: data}));

		}

		else {
			this.props.history.push("/login");
		}
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
				<Rater total={5} rating={this.instructorRating()} interactive={false} />
				<hr />
				<h4>Rating</h4>
				<Rater total={5} onRate={this.rateInstructor.bind(this)} />
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

InstructorProfile.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(InstructorProfile);
