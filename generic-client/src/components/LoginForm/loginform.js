import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

class LoginForm extends Component {
	state = {
		username: '',
		password: '',
		error: {}
	};

	loginUser = (event) => {
		event.preventDefault();
		const endpoint = 'http://localhost:8080/api/login';
		const creds = {
			username: this.state.username,
			// password: event.target.password.value
			password: this.state.password
		};
		Axios.post(endpoint, creds)
			.then((res) => {
				localStorage.setItem('userToken', res.data.token);
			})
			.catch((err) => {
				console.error('Error:\n', err.response.data);
				this.setState({
					...this.state,
					error: err.response.data
				});
			});

		this.props.history.push('/');
	};

	inputHandler = (event) => {
		this.setState({
			...this.state,
			[event.target.name]: event.target.value
		});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.loginUser}>
					<label htmlFor="username">
						Username:
						<input
							name="username"
							type="text"
							value={this.state.username}
							onChange={this.inputHandler}
						/>
					</label>
					<br />
					<label htmlFor="password">
						Password:
						<input
							name="password"
							type="password"
							value={this.state.password}
							onChange={this.inputHandler}
						/>
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
