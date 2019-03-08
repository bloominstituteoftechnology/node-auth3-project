import React from 'react';
import axios from 'axios';

import requiresAuth from '../auth/requiresAuth';

class Users extends React.Component {
    state ={
        users: []
    }
    render() {
        return (
            <div>
                <h2>List of Users</h2>
                
                    {this.state.users.map(user => {
                         return (
                            <div>
                               <h2 key={user.id}>{user.username}</h2> 
                            </div>
                           
                        )})}   
                   
            </div>
        )
    }
    componentDidMount() {
        axios.get('/users').then(res => {
            this.setState({ users: res.data })
        })
    }
        
    
}

export default requiresAuth(Users); //hides the users!