import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
import Form from "../Components/Form";
import { signUp } from "../actions";

class SignUp extends Component {
	state = {
		username: "",
		password: "",
		department: "",
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.signUp(this.state);
	};

	render() {
		if (this.props.loggedIn) {
			return <Redirect to="/users" />;
		}
		return (
			<div>
				<Form
					type={"signUp"}
					username={this.state.username}
					password={this.state.password}
					department={this.state.department}
					handleChange={e =>
						this.setState({ [e.target.name]: e.target.value })
					}
					handleSubmit={this.handleSubmit}
					name="Sign Up"
				/>
				<div>
					<p>Already Have an Account</p>
					<Link to="/">Log In </Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.loggedIn,
	users: state.users,
});

export default withRouter(
	connect(
		mapStateToProps,
		{ signUp },
	)(SignUp),
);
