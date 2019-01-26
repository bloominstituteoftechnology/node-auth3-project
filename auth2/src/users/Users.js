import React, { Component } from 'react';
import axios from 'axios';


class Users extends Component {
	render(){
		return(
			<div>
				<h1>LIST OF USERS</h1>
			</div>
		)
	}
	
	componentDidMount(){
		const endpoint = 'http://localhost:3000/api/users/';
		
		axios.get(endpoint)
			.then(res => {
				console.log("Data from /api/users :",res.data);
			}).catch(err => {
				console.log("Error from /api/users :",err);
			})
	}
}

export default Users;
