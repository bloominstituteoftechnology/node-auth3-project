import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    state = {
        users: []
    }
    
    componentDidMount() {  
        const token = localStorage.getItem('jwt');

        const requestOptions = {
            headers: {
                Authorization: token
            }
        }

        axios.get('http://localhost:3300/api/users',requestOptions).then(res => {
            this.setState({users: res.data})
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <ul>
                {this.state.users.map(user => {
                    return(
                    <li key={user.id}>{user.username}</li>
                    )
                })}
                </ul>
            </div>
        )
    }
}

export default Users