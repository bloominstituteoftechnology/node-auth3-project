import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { fetchUsers, logout } from "../actions";

class Users extends Component {
	componentDidMount() {
		this.props.fetchUsers();
	}

	render() {
		if (this.props.loggedIn === false) {
			return <Redirect to="/" />;
		} else if (this.props.users.length > 0) {
			return (
				<div>
					{this.props.users.map(user => (
						<p key={user.id}>{user.username}</p>
					))}
					<button onClick={this.props.logout}>Logout</button>
				</div>
			);
		} else {
			return <p>Loading Users</p>;
		}
	}
}

const mapStateToProps = state => ({
	users: state.users,
	loggedIn: state.loggedIn,
});

export default withRouter(
	connect(
		mapStateToProps,
		{ fetchUsers, logout },
	)(Users),
);
