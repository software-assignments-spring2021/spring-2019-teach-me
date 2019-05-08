import React, { Component } from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Alert from "react-bootstrap/Alert";
import Pagination from "react-js-pagination";
import "./InstructorProfile.css";
import { Comment } from "../../components/Comment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ClassDisplay } from "../../components/ClassDisplay";

class InstructorProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			instructor: {},
			comments: [],
			noCommentAlert: true,
			textAreaValue: "",
			classListing: [],
			noTeachClassWarning: false,
			activePage: 1,
			currentSection: 0,
			ratingSubmitStatus: {}
		};
	}

	instructorRating() {
		const {
			sumOfRatingAsInstructor,
			numOfRatingAsInstructor
		} = this.state.instructor;

		if (numOfRatingAsInstructor < 1) {
			return undefined;
		}
		else {
			return (sumOfRatingAsInstructor / numOfRatingAsInstructor).toFixed(2);
		}
	}

	displayTeach() {
		const { userId } = this.props.match.params;
		this.setState({ activePage: 1, filterWarning: false });
		const url = "/api/class-history-teach/" + userId;
		fetch(url)
			.then(response => response.json())
			.then(data => {
				if (data.length === 0) {
					this.setState({
						noTeachClassWarning: true,
						classListing: data,
						allClasses: data
					});
				} else {
					this.setState({
						noTeachClassWarning: false,
						classListing: data,
						allClasses: data
					});
				}
			});
	}

	rateInstructor(event) {
		if (this.props.auth.isAuthenticated) {
			const newRatingObj = {};

			const newSumOfRatingAsInstructor =
				this.state.instructor.sumOfRatingAsInstructor + event.rating;
			newRatingObj.newSumOfRatingAsInstructor = newSumOfRatingAsInstructor;
			const newNumOfRatingAsInstructor =
				this.state.instructor.numOfRatingAsInstructor + 1;
			newRatingObj.newNumOfRatingAsInstructor = newNumOfRatingAsInstructor;

			const instructorId = this.props.match.params.userId;
			newRatingObj.instructorId = instructorId;
			const userId = this.props.auth.user.id;
			newRatingObj.userId = userId;

			const updatedInstructor = this.state.instructor;
			updatedInstructor['sumOfRatingAsInstructor'] = newSumOfRatingAsInstructor;
			updatedInstructor['numOfRatingAsInstructor'] = newNumOfRatingAsInstructor;

			this.setState({ instructor: updatedInstructor });

			fetch("/api/rate-instructor/", {
				method: "POST",
				body: JSON.stringify(newRatingObj),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => response.json())
				.then(data => this.setState({ ratingSubmitStatus: data }));
		} else {
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
				const instructorObj = data[0];
				if (!instructorObj.introduction || instructorObj.introduction.length < 1) {
					instructorObj.introduction = undefined;
				}
				this.setState({ instructor: instructorObj });
				this.getComments();
			});
		this.displayTeach();
	}

	handlePageChange(pg) {
		this.setState({ activePage: pg });
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
								comment["className"] = item.name;
							});
							this.setState(
								{ comments: this.state.comments.concat(data) },
								function() {
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
								}
							);
						});
				}
			});
	}

	render() {
		const classListData = this.state.classListing.map(function(
			data,
			index
		) {
			return (
				<ClassDisplay
					key={index}
					title={data.name}
					description={data.description}
					price={data.price}
					instructor={data.instructorName}
					rating={data.rating}
					category={data.category}
					slug={data._id}
					instructorProfilePic={data.instructorProfilePic}
				/>
			);
		});

		const CLASSES_PER_PAGE = 4;

		const startIdx = (this.state.activePage - 1) * CLASSES_PER_PAGE;
		const endIdx = startIdx + CLASSES_PER_PAGE;
		const toDisplay = classListData.slice(startIdx, endIdx);
		const pageRange = Math.min(
			5,
			classListData.length / CLASSES_PER_PAGE + 1
		);

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

		const divStyle = {
			width: '100%'
		};

		return (
			<div className="instructor-profile-page">
				<h3 className="title">Instructor {instructor.name}</h3>
				<h4>Current Rating</h4>
				{this.instructorRating() ? 
					<div className="current-rating-container">
						<Rater
							total={5}
							rating={this.instructorRating()}
							interactive={false}
						/>
						<p className="rating-number">{this.instructorRating()} (based on {this.state.instructor.numOfRatingAsInstructor} reviews)</p>
					</div>
				:
					<Alert
						variant="warning"
						className="error-alert"
					>
						We don't have enough rating for this instructor yet.
					</Alert>
				}
				<hr />
				<h4>Rate this instructor</h4>
				<Rater total={5} onRate={this.rateInstructor.bind(this)} />
				{this.state.ratingSubmitStatus.status ===
					"success" ? (
						<Alert
							variant="success"
							className="success-alert"
						>
							You have successfully submitted your
							rating!
						</Alert>
					) : null}
				{this.state.ratingSubmitStatus.status ===
					"error" ? (
						<Alert
							variant="danger"
							className="error-alert"
						>
							Oops, it seems that we have encountered
							a problem:{" "}
							{this.state.ratingSubmitStatus.result}.
						</Alert>
					) : null}
				<hr />
				<h4>Description</h4>
				{instructor.introduction ? <p>{instructor.introduction}</p> : <Alert variant="warning">This instructor has not provided a self-introduction.</Alert>}
				<hr />
				<br />
				<div className="class-listing-display" style={divStyle}>
					<h3>Available Classes</h3>
					{toDisplay}
					{this.state.noTeachClassWarning ? (
						<Alert variant="danger">
							This instructor is not teaching any classes at this
							time.
						</Alert>
					) : null}
					<div className="pagination-container">
						<Pagination
							activePage={this.state.activePage}
							itemsCountPerPage={CLASSES_PER_PAGE}
							totalItemsCount={classListData.length}
							pageRangeDisplayed={pageRange}
							onChange={this.handlePageChange.bind(this)}
						/>
					</div>
				</div>
				<div className="detail-comments-container detail-comments-container-2">
					<h3>Comments</h3>
					{commentData}
					{this.state.noCommentAlert ? (
						<Alert variant="warning" className="not-comment-alert">
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