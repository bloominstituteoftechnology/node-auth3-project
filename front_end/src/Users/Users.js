import React, { Component } from 'react';
import axios from 'axios'; 

class Users extends Component{
    constructor(){
        super(); 
        this.state={
            users: []
        }
    }
    componentDidMount(){
        axios 
        .get("http://localhost:3300/api/users", this.state)
        .then(res =>{
            console.log("Users Data: ", res); 
            this.setState({users: res.data}); 
        })
        .catch(err => console.log(err, "error"))
    }
    logout = event => {
        event.preventDefault(); 

        axios
        
    }
    render(){
        return(
            <div>
                <button onClick={this.logout}>Log Out</button>
                <ul>
                    {this.state.users.map(user => (
                    <li key={user.id}>{user.username}</li>
                    ))}
    
                    </ul>
            </div>
        )
    }
}
export default Users; 
