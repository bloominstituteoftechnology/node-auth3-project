import React, { Component } from 'react';
import axios from 'axios';

// Styles
import styled from 'styled-components';

const SigninForm = styled.form`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 80px;

	p, input {
		text-align: center;
		width: 30%;
	}

	input {
		border-radius: 5px;
		padding: 5px 10px;
		margin-bottom: 10px;
	}

	button {
		padding: 5px 10px;
		border-radius: 5px;

		&:hover {
			background-color: black;
			color: white;
			cursor: pointer;
		}
	}
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
				<p>Username:</p>
				<input
					placeholder = 'Enter username...'
					name = 'username'
					value = { username }
					onChange = { this.handleInputChange }
				/>

				<p>Password:</p>
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
