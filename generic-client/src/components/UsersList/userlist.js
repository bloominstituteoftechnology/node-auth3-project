import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

import User from './user';

class UserList extends Component {
	state = {
		users: [],
		error: {}
	};

	componentDidMount = () => {
		const endpoint = 'http://localhost:8080/api/users';
		const token = localStorage.getItem('userToken');
		const options = {
			headers: {
				Authorization: token
			}
		};

		Axios.get(endpoint, options)
			.then((res) => {
				this.setState({
					...this.state,
					users: res.data.users
				});
			})
			.catch((err) => {
				console.error('Error:\n', err.response.data);
				this.setState({
					...this.state,
					error: err.response.data
				});
			});
	};

	render() {
		return (
			<div>
				{this.state.error ? (
					<p>{`HTTP ${this.state.error.httpStatus}: ${
						this.state.error.title
					}`}</p>
				) : (
					this.state.users.map((user) => <User user={user} />)
				)}
			</div>
		);
	}
}

UserList.propTypes = {};

export default UserList;
