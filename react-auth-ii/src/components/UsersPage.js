// Dependencies
import React, { Component } from 'react';
import axios from 'axios';
// import styled from 'styled-components';

class UsersPage extends Component {
	state = {
		users: []
	};

	componentDidMount() {
		const token = localStorage.getItem('jwt');
		const options = {
			headers: {
				Authorization: token
			}
		};

		axios
			.get('http://localhost:5000/api/users', options)
			.then(res => {
				this.setState({ users: res.data.users });
			})
			.catch(err => {
				console.error(err);
			});
	}

	render() {
		return (
			<div className="UsersPage">
				<ul className="UserList">
					{this.state.users.map(user => (
						<li className="User" key={user.id}>
							{user.username}
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default UsersPage;
