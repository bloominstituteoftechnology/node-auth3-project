// Dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
// import styled from 'styled-components';

class SignupPage extends Component {
	state = {
		username: '',
		password: '',
		department: '',
		toUsersPage: false
	};

	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
		const { username, password, department } = this.state;
		const credentials = { username, password, department };
		axios
			.post('http://localhost:5000/api/register', credentials)
			.then(res => {
				console.log(res.data);
				localStorage.setItem('jwt', res.data.token);
				this.setState({ toUsersPage: true });
			})
			.catch(err => {
				console.error(err);
			});
	};

	render() {
		if (this.state.toUsersPage === true) {
			return <Redirect to="/users" />;
		}

		return (
			<div className="SignupPage">
				<form onSubmit={this.handleSubmit}>
					<input
						name="username"
						value={this.state.username}
						onChange={this.changeHandler}
						type="text"
						placeholder="username"
						required
					/>
					<input
						name="password"
						value={this.state.password}
						onChange={this.changeHandler}
						type="password"
						placeholder="password"
						required
					/>
					<input
						name="department"
						value={this.state.department}
						onChange={this.changeHandler}
						type="text"
						placeholder="department"
					/>

					<input type="submit" />
				</form>
			</div>
		);
	}
}

export default SignupPage;
