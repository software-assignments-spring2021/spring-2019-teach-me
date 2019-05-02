import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import "./Dashboard.css";

class Dashboard extends Component {
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};
	render() {
		const { user } = this.props.auth;
		return (
			<div className="container logout-container">
				<h4>
					Are you sure you want to log out, {" "}
					{user.name.split(" ")[0]}?
					<p className="flow-text grey-text text-darken-1">
						Press the button below to confirm.
					</p>
				</h4>
				<div className="login-buttons">
					<button
						onClick={this.onLogoutClick}
						className="btn btn-large waves-effect waves-light hoverable"
					>
						Logout
					</button>
				</div>
			</div>
		);
	}
}
Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(
	mapStateToProps,
	{ logoutUser }
)(Dashboard);