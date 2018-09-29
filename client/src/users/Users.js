import React, { Component } from 'react';
import '../App.css';
import {Route} from 'react-router-dom';
import axios from 'axios'

class Users extends Component {
  state = {
    //   users: ''
    users: []
  }  
  render() {
    return (
      <div className="Users">
        <h1> Users page </h1>
        {/* {this.state.users.map(user => {
            <ul>
                <li key = {user.id}>
                    {user.username}
                </li>
            </ul>
        })}         */}
        <ul>
            {this.state.users.map(
                user => {
                    <li key = {user.id}>
                        {user.username}
                    </li>
                }
            )}
        </ul>
      </div>
    );
  }


  componentDidMount() {
    const token = localStorage.getItem('jwt');

    const requestOptions = {
        headers: {
            Authorization: token,
        },
    };

    axios
        .get('http://localhost:9000/api/users', this.state)
        .then(res =>{
            this.setState({users: res.data})
        }).catch()
        .catch(err => {
            console.error('Axios failed')
        })

    console.log('state', this.state);
  }; 
}

export default Users;