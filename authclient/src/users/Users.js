import React from 'react';
import axios from 'axios';
import User from './User';
import styled from 'styled-components'

const EmploySort = styled.div`
	display: flex;
	flex-wrap: wrap;
`

const LogBTN = styled.button`
	margin-left: 2%;
`

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
				///this.props.history.push('/')
			})
	}

	logout = event => {
    localStorage.removeItem('jwt');
    this.props.history.push('/')
  }

	render() {
		return (
			<div>
			<LogBTN onClick={this.logout}>logout</LogBTN>
				<EmploySort>
						{this.state.users.map(user => <User key={user.id} user={user}/>)}
				</EmploySort>
			</div>
		)
	}
}

export default Users;
