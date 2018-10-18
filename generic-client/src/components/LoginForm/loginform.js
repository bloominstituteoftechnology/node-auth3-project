import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

class LoginForm extends Component {
	state = {
		username: ''
	};

	loginUser = (event) => {
		event.preventDefault();
	};

	inputHandler = (event) => {
		this.setState({
			...this.state,
			[event.EventTarget.name]: event.target.value
		});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.loginUser}>
					<label htmlFor="username">
						Username:
						<input name="username" type="text" />
					</label>
					<br />
					<label htmlFor="current-password">
						Password:
						<input name="current-password" type="password" />
					</label>
					<br />
					<input type="submit" value="Login" />
				</form>
			</div>
		);
	}
}

LoginForm.propTypes = {};

export default LoginForm;
