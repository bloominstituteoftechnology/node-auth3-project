import React, { Component } from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const initialUser = {
	username: '',
	password: '',
	department: ''
};

export default class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: { ...initialUser },
			message: ''
		};
	}

	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({ user: { ...this.state.user, [name]: value } });
	};

	submitHandler = (e) => {
		e.preventDefault();
		axios
			.post(`http://localhost:9000/api/login`, this.state.user)
			.then((res) => {
				if (res.status === 201 && res.data) {
					localStorage.setItem('my_random_token_name', res.data);
					this.props.history.push('/');
				} else {
					throw new Error();
				}
			})
			.catch((err) => {
				this.setState({
					message: 'Registration failed.',
					user: { ...initialUser }
				});
			});
	};
	render() {
		return (
			<div>
				<form onSubmit={this.submitHandler}>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						name="username"
						value={this.state.user.username}
						onChange={this.changeHandler}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="text"
						id="password"
						name="password"
						value={this.state.user.password}
						onChange={this.changeHandler}
					/>
					<button type="submit">Submit</button>
				</form>
				{this.state.message ? <h4>{this.state.message}</h4> : undefined}
			</div>
		);
	}
}
