import React, { Component } from 'react';
import axios from 'axios';

// Components
import { User } from './index.js';

export default class Users extends Component {
	state = {
		username: '',
		department: '',
		users: [],
	};
	componentDidMount() {
		const localToken = JSON.parse(localStorage.getItem('jwtToken'));
		if (localToken) {
			const header = { Authorization: localToken.token };
			return axios
				.get('http://localhost:5000/api/users/', { headers: header })
				.then(users => this.setState({
					username: localToken.username,
					department: localToken.department,
					users: users.data,
				}))
				.catch(err => console.log(err));
		}
		return this.props.goTo('/signin');
	};

	render() {
		const {
			username,
			department,
			users,
		} = this.state;

		return(
			<div>
				<h2>Users List</h2>

				<h3>Welcome, { username }!</h3>

				<p>Since you are in { department }, here is a list of users from that department.</p>

				{ users.map((user, i) => <User key = { i } user = { user } /> ) }
			</div>
		);
	}
};
