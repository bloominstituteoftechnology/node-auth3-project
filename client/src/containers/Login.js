import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
import Form from "../Components/Form";
import { login } from "../actions";

class Login extends Component {
	state = {
		username: "",
		password: "",
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.login(this.state);
	};

	render() {
		if (this.props.loggedIn) {
			return <Redirect to="/users" />;
		}
		return (
			<div>
				<Form
					username={this.state.username}
					password={this.state.password}
					handleChange={e =>
						this.setState({ [e.target.name]: e.target.value })
					}
					handleSubmit={this.handleSubmit}
					name="Login"
				/>
				<div>
					<p>Don't Have an Account?</p>
					<Link to="/signup">Sign Up ya ding dong! </Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({ loggedIn: state.loggedIn });

export default withRouter(
	connect(
		mapStateToProps,
		{ login },
	)(Login),
);
