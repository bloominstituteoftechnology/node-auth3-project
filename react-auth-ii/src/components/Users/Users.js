import React, { Component } from 'react';
import axios from 'axios';


class Users extends Component {
        state = {
            users: [],
        }


   componentDidMount() {
   	const token = localStorage.getItem('jwt')
   	const requestOptions= {
   		headers: {
   			Authorization: token,
   		}
   	}
   			axios
   				.get('http://localhost:3300/users', requestOptions)
   			 	.then(res => {
   					this.setState({ users: res.data});
       	 })
   				.catch(err => {
            console.error('Axios falied');
         	 })
   					console.log('state', this.state)
   		};


  render() {
  	return(
  	       <div>
  	       	<h1 className="users">Users</h1>
  	       		<ul>
  	       			{this.state.users.map(user => {
  	       				return <li key={ user.id }>{ user.name }     { user.department}</li>})}
  	       		</ul>
  	       </div>
  	);
	};

};
export default Users;
