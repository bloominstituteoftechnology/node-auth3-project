import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchUsers } from "../actions";

class Users extends Component {
	componentDidMount() {
		this.props.fetchUsers();
	}

	render() {
		return (
			<div>
				{this.props.users.map(user => (
					<p key={user.id}>{user.username}</p>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => ({ users: state.users });

export default withRouter(
	connect(
		mapStateToProps,
		{ fetchUsers },
	)(Users),
);
