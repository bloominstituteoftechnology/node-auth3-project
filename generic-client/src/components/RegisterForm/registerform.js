import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

class RegisterForm extends Component {
	state = {
		username: '',
		department: ''
	};

	registerUser = (event) => {
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
				<form onSubmit={this.registerUser}>
					<label htmlFor="username">
						Username:
						<input name="username" type="text" />
					</label>
					<br />
					<label htmlFor="department">
						Department:
						<input name="department" type="text" />
					</label>
					<br />
					<label htmlFor="password">
						Password:
						<input name="password" type="password" />
					</label>
					<br />
					<input type="submit" value="Register" />
				</form>
			</div>
		);
	}
}

RegisterForm.propTypes = {};

export default RegisterForm;
