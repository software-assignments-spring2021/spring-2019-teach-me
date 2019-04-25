import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { LinkContainer } from "react-router-bootstrap";
import { StudentDisplay } from "../../components/StudentDisplay";
import { Comment } from "../../components/Comment";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import "./ClassDetail.css";

class ClassDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentClass: {},
			successRedirect: {},
			commentSubmitStatus: {},
			loginRequired: false,
			classNotRegistered: false,
			noStudentAlert: false,
			isInstructor: false,
			noCommentAlert: false,
			archiveModalDisplay: false,
			completeModalDisplay: false,
			studentsList: [],
			comments: [],
			textAreaValue: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleWithdraw = this.handleWithdraw.bind(this);
		this.getStudents = this.getStudents.bind(this);
		this.deleteClass = this.deleteClass.bind(this);
		this.archiveClass = this.archiveClass.bind(this);
		this.completeClass = this.completeClass.bind(this);
		this.getComments = this.getComments.bind(this);
		this.submitComment = this.submitComment.bind(this);
		this.showConfirmArchive = this.showConfirmArchive.bind(this);
		this.handleCloseArchiveModal = this.handleCloseArchiveModal.bind(this);
		this.showConfirmComplete = this.showConfirmComplete.bind(this);
		this.handleCloseCompleteModal = this.handleCloseCompleteModal.bind(
			this
		);
	}

	deleteClass() {}

	showConfirmComplete() {
		this.setState({ completeModalDisplay: true });
	}

	handleCloseCompleteModal() {
		this.setState({ completeModalDisplay: false });
	}

	showConfirmArchive() {
		this.setState({ archiveModalDisplay: true });
	}

	handleCloseArchiveModal() {
		this.setState({ archiveModalDisplay: false });
	}

	completeClass() {
		const { classId } = this.props.match.params;

		if (this.props.auth.isAuthenticated) {
			const newUserClassPair = {};
			newUserClassPair.userID = this.props.auth.user.id;
			newUserClassPair.classID = classId;
			newUserClassPair.complete = true;

			console.log(newUserClassPair);

			const url = "/api/complete-class";
			fetch(url, {
				method: "POST",
				body: JSON.stringify(newUserClassPair),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => response.json())
				.then(data => this.setState({ successRedirect: data }));
		} else {
			this.setState({ loginRequired: true });
			setTimeout(() => {
				this.props.history.push("/login");
			}, 2000);
		}
	}

	archiveClass() {
		if (this.props.auth.isAuthenticated) {
			if (
				this.state.currentClass.instructorID === this.props.auth.user.id
			) {
				const newClassObj = {};
				const { classId } = this.props.match.params;
				newClassObj.classID = classId;
				newClassObj.archive = true;

				console.log(newClassObj);
				const url = "/api/archive-class";
				fetch(url, {
					method: "POST",
					body: JSON.stringify(newClassObj),
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json"
					}
				})
					.then(response => response.json())
					.then(data => this.setState({ successRedirect: data }));
			}
		} else {
			this.setState({ loginRequired: true });
			setTimeout(() => {
				this.props.history.push("/login");
			}, 2000);
		}
	}

	getStudents() {
		if (this.props.auth.isAuthenticated) {
			if (
				this.state.currentClass.instructorID === this.props.auth.user.id
			) {
				const { classId } = this.props.match.params;
				const url = "/api/get-students/" + classId;
				fetch(url)
					.then(response => response.json())
					.then(data =>
						this.setState({ studentsList: data }, function() {
							if (this.state.studentsList.length === 0) {
								this.setState({ noStudentAlert: true });
							}
						})
					);
			} else {
				this.setState({ isInstructor: false });
			}
		} else {
			this.setState({ loginRequired: true });
			setTimeout(() => {
				this.props.history.push("/login");
			}, 2000);
		}
		/*
		const data = [{date: '2019-1-1', userID: {name: 'test'}}, {date: '2019-1-2', userID: {name: 'test2'}}, {date: '2019-1-3', userID: {name: 'haha'}}, {date: '2019-1-1', userID: {name: 'test'}}, {date: '2019-1-1', userID: {name: 'test'}}];
		this.setState({studentsList: data});
		*/
	}

	handleSubmit() {
		const { classId } = this.props.match.params;

		if (this.props.auth.isAuthenticated) {
			const newUserClassPair = {};
			newUserClassPair.userID = this.props.auth.user.id;
			newUserClassPair.classID = classId;

			const url = "/api/register-class";
			fetch(url, {
				method: "POST",
				body: JSON.stringify(newUserClassPair),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => response.json())
				.then(data => this.setState({ successRedirect: data }));
		} else {
			this.setState({ loginRequired: true });
			setTimeout(() => {
				this.props.history.push("/login");
			}, 2000);
		}
	}

	handleWithdraw() {
		const { classId } = this.props.match.params;

		if (this.props.auth.isAuthenticated) {
			const newUserClassPair = {};
			newUserClassPair.userID = this.props.auth.user.id;
			newUserClassPair.classID = classId;

			const url = "/api/drop-class";
			fetch(url, {
				method: "POST",
				body: JSON.stringify(newUserClassPair),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => response.json())
				.then(data => this.setState({ successRedirect: data }));
		} else {
			this.setState({ loginRequired: true });
			setTimeout(() => {
				this.props.history.push("/login");
			}, 2000);
		}
	}

	getComments() {
		const { classId } = this.props.match.params;
		const url = "/api/comments/" + classId;
		fetch(url)
			.then(response => response.json())
			.then(data =>
				this.setState({ comments: data }, function() {
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
			);

		/*
		const s = 'All incoming students must submit official copies of university transcripts/academic records from all previously attended universities along with official test scores (if applicable) to Cornell Tech.To be considered official, the required documents must be received directly from the issuing institution and properly authenticated. If your transcripts/academic records are not in English, you must provide an official English translation in addition to your official transcripts/academic records. If your transcripts/academic records do not state your degree-conferral date, you must also provide an official copy of your degree certificate.';
		const data = [{name: 'someone', commentText: s, commentDate: '2019-1-1'}, {name: 'someone', commentText: s, commentDate: '2019-1-1'}];
		this.setState({comments: data});
		*/
	}

	submitComment(event) {
		event.preventDefault();

		if (this.props.auth.isAuthenticated) {
			const { classId } = this.props.match.params;
			const commentForm = new FormData(event.currentTarget);
			const commentObj = {};

			for (let item of commentForm.entries()) {
				commentObj[item[0]] = item[1];
			}

			console.log(commentObj);

			const url =
				"/api/comments/" + classId + "/" + this.props.auth.user.id;
			fetch(url, {
				method: "POST",
				body: JSON.stringify(commentObj),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => response.json())
				.then(data =>
					this.setState({ commentSubmitStatus: data }, () =>
						this.getComments()
					)
				);
		} else {
			this.setState({ loginRequired: true });
			setTimeout(() => {
				this.props.history.push("/login");
			}, 2000);
		}
	}

	componentDidMount() {
		const { classId } = this.props.match.params;
		const url = "/api/classes/" + classId;
		fetch(url)
			.then(response => response.json())
			.then(data =>
				this.setState({ currentClass: data }, () => {
					if (this.props.auth.isAuthenticated) {
						if (
							this.state.currentClass.instructorID ===
							this.props.auth.user.id
						) {
							this.setState({ isInstructor: true });
						}
					}
					this.getComments();
				})
			);

		/*
		const data = {"_id":"5c8547511c9d44000024fb63","name":"Piano","description":"Piano","price":75,"proposedSchedule":"Monday","instructor":"5c854805e0c8200000afd73a","rating":"9.6","cateogry":"Art"};
		this.setState({currentClass: data});
		*/
	}

	render() {
		const { classId } = this.props.match.params;
		const classData = this.state.currentClass;
		const studentData = this.state.studentsList.map(function(data, index) {
			return (
				<StudentDisplay
					key={index}
					name={data.userID.name}
					signupDate={data.date}
					userID={data.userID._id}
				/>
			);
		});
		const commentData = this.state.comments.map(function(data, index) {
			return (
				<Comment
					key={index}
					name={data.name}
					commentText={data.commentText}
					commentDate={data.commentDate}
					userID={data.userID}
				/>
			);
		});

		const instructorButtons = (
			<div className="detail-buttons-container">
				<Button onClick={this.getStudents} variant="info">
					See Registered Students
				</Button>
				<LinkContainer to={"/edit-class/" + classId}>
					<Button variant="info">Edit Class</Button>
				</LinkContainer>
				{/* <Button onClick={this.deleteClass} variant="warning" disabled>Delete Class</Button> */}
				<Button onClick={this.showConfirmArchive} variant="warning">
					Archive Class
				</Button>
				<Modal
					show={this.state.archiveModalDisplay}
					onHide={this.handleCloseArchiveModal}
				>
					<Modal.Header closeButton>
						<Modal.Title>Confirm Class Archive</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Are you sure that you want to archive this class? If
						yes, we will notify your students and this class will no
						longer be open to registration.
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={this.handleCloseArchiveModal}
						>
							{" "}
							Oops, go back{" "}
						</Button>
						<Button variant="primary" onClick={this.archiveClass}>
							{" "}
							Yes{" "}
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);

		const studentButtons = (
			<div className="detail-buttons-container">
				<Button onClick={this.handleSubmit} variant="info">
					Register now!
				</Button>
				<Button onClick={this.handleWithdraw} variant="warning">
					Withdraw from Class
				</Button>
				<Button onClick={this.showConfirmComplete} variant="warning">
					Mark Class as Completed
				</Button>
				<Modal
					show={this.state.completeModalDisplay}
					onHide={this.handleCloseCompleteModal}
				>
					<Modal.Header closeButton>
						<Modal.Title>Confirm Class Archive</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Are you sure that you want to mark this class as
						completed? If yes, we will mark this class as completed
						and notify your instructor.
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={this.handleCloseCompleteModal}
						>
							Oops, go back
						</Button>
						<Button variant="primary" onClick={this.completeClass}>
							Yes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);

		return (
			<div className="detail-page-container">
				<Jumbotron>
					<h1>Class Detail: {classData.name}</h1>
					<p>{classData.description}</p>
				</Jumbotron>
				<div className="detail-container">
					<Row>
						<Col sm={5}>
							<div className="detail-image-container">
								<img
									alt="instructor profile"
									src="/images/default-user.png"
									className="instructor-image"
								/>
								<p>Class taught by:</p>
								<LinkContainer
									to={"/instructor/" + classData.instructorID}
									className="instructor-link"
								>
									<h5>{classData.instructorName}</h5>
								</LinkContainer>
							</div>
						</Col>
						<Col sm={7}>
							<div className="detail-text-container">
								<h3>About</h3>
								<p>{classData.about}</p>
								<h3>Pricing</h3>
								<p>${classData.price}</p>
								<h3>Proposed Class Schedule</h3>
								<p>{classData.proposedSchedule}</p>
								<h3>Class Category</h3>
								<p>{classData.category}</p>
								<h3>Payment Link</h3>
								<a
									href={"https://" + classData.paymentLink}
									target="_blank"
								>
									{classData.paymentLink}
								</a>
							</div>
						</Col>
					</Row>
					<Row>
						<div className="alerts-container">
							{this.state.successRedirect.status === "success" ? (
								<Alert
									variant="success"
									className="success-alert"
								>
									You have successfully{" "}
									{this.state.successRedirect.result} this
									class!{" "}
									{this.state.successRedirect.instructorEmail}
								</Alert>
							) : null}
							{this.state.successRedirect.status === "error" ? (
								<Alert variant="danger" className="error-alert">
									Oops, it seems that we have encountered a
									problem: {this.state.successRedirect.result}
								</Alert>
							) : null}
							{this.state.loginRequired ? (
								<Alert variant="danger" className="login-alert">
									It seems that you have not logged in. We are
									now taking you to the log in page.
								</Alert>
							) : null}
							{this.state.notInstructorAlert ? (
								<Alert
									variant="danger"
									className="not-instructor-alert"
								>
									Registered student information is only
									visible to the instructor of this class.
								</Alert>
							) : null}
							{this.state.noStudentAlert ? (
								<Alert
									variant="warning"
									className="no-student-alert"
								>
									There are no registered students for this
									class.
								</Alert>
							) : null}
						</div>
					</Row>
					<Row>
						{this.state.isInstructor
							? instructorButtons
							: studentButtons}
					</Row>
					<Row>
						<div className="student-list-container">
							{studentData}
						</div>
					</Row>
					<Row>
						<div className="detail-comments-container">
							<h3>Comments</h3>
							{commentData}
							<div className="alerts-container">
								{this.state.commentSubmitStatus.status ===
								"success" ? (
									<Alert
										variant="success"
										className="success-alert"
									>
										You have successfully submitted your
										comment!
									</Alert>
								) : null}
								{this.state.commentSubmitStatus.status ===
								"error" ? (
									<Alert
										variant="danger"
										className="error-alert"
									>
										Oops, it seems that we have encountered
										a problem:{" "}
										{this.state.commentSubmitStatus.result}.
									</Alert>
								) : null}
								{this.state.noCommentAlert ? (
									<Alert
										variant="warning"
										className="not-comment-alert"
									>
										There are no comments yet. Submit your
										comment below and make it the first one!
									</Alert>
								) : null}
							</div>
							<div className="comment-input-container">
								<Form onSubmit={e => this.submitComment(e)}>
									<Form.Group controlId="comment-textarea">
										<Form.Control
											as="textarea"
											rows="3"
											name="commentText"
											value={this.state.textAreaValue}
											onChange={e =>
												this.setState({
													textAreaValue:
														e.target.value
												})
											}
										/>
									</Form.Group>
									<Button variant="primary" type="submit">
										Submit Comment
									</Button>
								</Form>
							</div>
						</div>
					</Row>
				</div>
			</div>
		);
	}
}

ClassDetail.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(ClassDetail);