import React from 'react';
import axios from 'axios';

class Users extends React.Component {
	constructor(){
		super();
		this.state = {
			users: [],
		};
	}

	componentDidMount(){
		const token = localStorage.getItem('jwt')
		const reqOptions = {
			headers: {
				Authorization: token,
			}
		};

		axios
			.get('http://localhost:5555/api/users', reqOptions)
			.then(response => {
				//console.log(response)
				this.setState({
					users: response.data
				})
			})
			.catch(error => {
				console.log(error)
				this.props.history.push('/signin')
			})
	}

	logout = event => {
    localStorage.removeItem('jwt');
    this.props.history.push('/signin')
  }

	render() {
		return (
			<div>
				<ul>
					{this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
				</ul>
				<button onClick={this.logout}>logout</button>
			</div>
		)
	}
}

export default Users;
