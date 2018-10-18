import React, { Component } from 'react';
import axios from 'axios';

// Styles
import styled from 'styled-components';

const SigninForm = styled.form`
`;

export default class Signin extends Component {
	state = {
		username: '',
		password: '',
	};

	handleInputChange = e => {
		e.preventDefault();
		this.setState({ [ e.target.name ]: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		return axios
			.post('http://localhost:5000/api/users/login', this.state)
			.then(res => {
				const localToken = {
					username: res.data.username,
					department: res.data.department,
					token: res.data.jwtToken,
					tokenExp: res.data.tokenExp,
				};
				localStorage.setItem('jwtToken', JSON.stringify(localToken));
				this.props.goTo('/users', 'Thanks for logging in. Here is the list of users in your department.');
			})
			.catch(err => console.log(err));
	};

	componentDidMount() {
		const localToken = JSON.parse(localStorage.getItem('jwtToken'));
		if (localToken) {
			this.props.goTo('/', 'You are already signed in.');
		}
	};

	render() {
		const {
			username,
			password,
		} = this.state;

		return(
			<SigninForm onSubmit = { this.handleSubmit }>
				Username:
				<input
					placeholder = 'Enter username...'
					name = 'username'
					value = { username }
					onChange = { this.handleInputChange }
				/>

				Password:
				<input
					type = 'password'
					placeholder = 'Enter password...'
					name = 'password'
					value = { password }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Log in</button>
			</SigninForm>
		);
	}
};
