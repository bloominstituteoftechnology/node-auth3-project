import React, { Component } from 'react';
import axios from 'axios';

// Styles
import styled from 'styled-components';

const SignupForm = styled.form`
`;

export default class Signup extends Component {
	state = {
		username: '',
		password: '',
		department: 'Finance',
	};

	handleInputChange = e => {
		e.preventDefault();
		this.setState({ [ e.target.name ]: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		return axios
			.post('http://localhost:5000/api/users/register', this.state)
			.then(res => {
				const localToken = {
					username: res.data.username,
					department: res.data.department,
					token: res.data.jwtToken,
				};
				localStorage.setItem('jwtToken', JSON.stringify(localToken));
				this.props.goTo('/users');
			})
			.catch(err => console.log(err.response.data.error));
	};

	render() {
		const {
			username,
			password,
			department,
		} = this.state;

		return(
			<SignupForm onSubmit = { this.handleSubmit }>
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

				Department:
				<select
					name = 'department'
					value = { department }
					onChange = { this.handleInputChange }
				>
					<option value = 'Finance'>Finance</option>
					<option value = 'IT'>IT</option>
					<option value = 'HR'>HR</option>
				</select>

				<button type = 'submit'>Register</button>
			</SignupForm>
		);
	}
};
