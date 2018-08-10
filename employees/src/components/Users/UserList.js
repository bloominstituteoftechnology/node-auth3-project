import React, { Component } from 'react';
import axios from 'axios';

class UserList extends Component {
    state= {
        currentUser: '',
        users:[]
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const requestOptions = {
            headers:{
          Authorization: token
            }
        }
        axios
        .get('http://localhost:8000/api/users', requestOptions)
        .then(response=>{
            console.log('userlist_response', response)
            this.setState({
                currentUser:response.data.currentUser,
                users: response.data.users
            })

        })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.users.map(user=>{
                  return  <li key={user.id}>{user.username}</li>
                })}
                </ul>
            </div>
        );
    }
}

export default UserList;
