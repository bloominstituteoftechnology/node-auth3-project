import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

class RegisterForm extends Component {
	state = {
		username: '',
		department: '',
		password: '',
		error: {},
		success: false
	};

	registerUser = (event) => {
		event.preventDefault();
		const endpoint = 'http://localhost:8080/api/register';
		const newUser = {
			username: this.state.username,
			department: this.state.department,
			password: this.state.password
		};
		Axios.post(endpoint, newUser)
			.then((res) => {
				localStorage.setItem('userToken', res.data.token);
				this.setState({ ...this.state, success: true });
			})
			.catch((err) => {
				console.error('Error:\n', err.response.data);
				this.setState({
					...this.state,
					error: err.response.data
				});
			});
	};

	inputHandler = (event) => {
		this.setState({
			...this.state,
			[event.target.name]: event.target.value
		});
	};

	render() {
		if (this.state.success === true) {
			return <Redirect to="/users" />;
		}
		return (
			<div>
				<form onSubmit={this.registerUser}>
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
					<label htmlFor="department">
						Department:
						<input
							name="department"
							type="text"
							value={this.state.department}
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
					<input type="submit" value="Register" />
				</form>
			</div>
		);
	}
}

export default RegisterForm;
