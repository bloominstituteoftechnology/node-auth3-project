// Dependencies
import React, { Component } from 'react';
// import styled from 'styled-components';

class LoginPage extends Component {
	state = {
		username: '',
		password: ''
	};

	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
		const { username, password } = this.state;
		axios
			.post('http://localhost:5000/api/login', { username, password })
			.then(res => {
				localStorage.setItem('jwt', res.data.token);
			})
			.catch(err => {
				console.error('ERROR', err);
			});
	};

	render() {
		return (
			<div className="LoginPage">
				<form onSubmit={this.submitHandler}>
					<input
						name="username"
						value={this.state.username}
						onChange={this.changeHandler}
						type="text"
					/>
					<input
						name="password"
						value={this.state.password}
						onChange={this.changeHandler}
						type="password"
					/>

					<input type="submit" />
				</form>
			</div>
		);
	}
}

export default LoginPage;
