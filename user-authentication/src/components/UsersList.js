import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class UsersList extends React.Component {

constructor(){
        super();
        
        this.state= {
                users:[],
		logout: false,
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

logoutHandler = event =>{
        localStorage.removeItem('jwt');
	this.setState({users:[], logout: true});
};


render() {
    return (<div>
	    {this.state.logout ?
                (<div>
                <h1>You are successfully logged out...</h1>
                <Link to="/">Login</Link><br /><br />
		</div>) :(	
      <div>
    	{this.state.users.map(user => {return <ul><li key={user.id}>{user.username}</li></ul>}		
	)}

	<button onClick={this.logoutHandler}>Logout</button>    
     </div>
		)}
    </div>);
  }
}

export default UsersList;


