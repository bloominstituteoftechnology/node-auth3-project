import React, { Component } from 'react';
import axios from 'axios';

// Components
import { User } from './index.js';

// Styles
import styled from 'styled-components';

const UsersDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	wrap-direction: column;
	justify-content: center;
	align-items: center;

	* {
		width: 100%;
		text-align: center;
		padding: 10px;
	}

	.user-info {
		color: lime;
		padding: 0;
	}

	h2 {
		font-size: 1.6rem;
	}

	h3 {
		font-size: 1.2rem;
	}
`;

export default class Users extends Component {
	state = {
		username: '',
		department: '',
		users: [],
	};
	componentDidMount() {
		const localToken = JSON.parse(localStorage.getItem('jwtToken'));
		const header = { Authorization: localToken ? localToken.token : null };
		// if there is no token, go to sign in
		if (!localToken) {
			return this.props.goTo('/signin', 'You are not logged in. Log in to view this.');
		// else if there is a token but its expired, remove it from localStorage and go to sign in
		} else if (localToken.tokenExp < new Date().getTime() / 1000) {
			localStorage.removeItem('jwtToken');
			return this.props.goTo('/signin', 'Your token expired. Please sign in again.');
		// else if there is a token and its not expired, get the list of users
		} else {
			return axios
				.get('http://localhost:5000/api/users/all', { headers: header })
				.then(res => this.setState({
					username: localToken.username,
					department: localToken.department,
					users: res.data.users,
				}))
				.catch(err => console.log(err));
		}
	};

	render() {
		const {
			username,
			department,
			users,
		} = this.state;

		return(
			<UsersDiv>
				<h2>Users List</h2>

				<h3>Welcome, <span className = 'user-info'>{ username }</span>!</h3>

				<p>Since you are in <span className = 'user-info'>{ department }</span>, here is a list of users from that department.</p>

				{ users.map((user, i) => <User key = { i } user = { user } /> ) }
			</UsersDiv>
		);
	}
};
