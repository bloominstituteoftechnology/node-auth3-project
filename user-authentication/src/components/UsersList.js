import React, { Component } from 'react';
import axios from 'axios';

class UsersList extends React.Component {

constructor(){
        super();
        
        this.state= {
                users:[],     
        };

}

	
componentDidMount() {

	const token = localStorage.getItem('jwt');
	const requestOptions={
		headers:{
			Authorization: token
		}
	}

        axios.get('http://localhost:4003/users', requestOptions)

        .then(res =>{ 
        this.setState({users: res.data});
        })

        .catch(err =>{
        console.log("error: couldn't get the users");
        });

};




render() {
    return (
      <div>
    	{this.state.users.map(user => <ul><li key={user.id}>{user.username}</li></ul>		
	)}
     </div>
    );
  }
}

export default UsersList;


