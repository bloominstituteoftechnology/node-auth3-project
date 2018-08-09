import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: null,
         }
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt');
    
        axios
        .get('http://localhost:8002/iusers')
        .then(res => {
            this.setState({ users: res.data })
        })
        .catch(err => {
            console.error('Axios failed');
        });
        console.log('state', this.state)
    }

    render() { 
        return (
            <ul> 
            {this.state.users.map(user => <li key={user.id}> { user.username} </li>)}
            </ul>
         );
    }
}
 



export default Users;