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
        {/* <h1> Users page </h1>
        {console.log(this.state.users)} */}

        {/* {this.state.users.map(user => {
            <ul>
                <li key = {user.id}>
                    {user.username}
                </li>
            </ul>
        })}         */}
        { <ul>
            {this.state.users.map(
                user => {
                    <li key = {user.id}>
                        {'hello'}
                        {user.username}
                        {console.log('user.username: ', user.username)}
                    </li>
                }
            )}
        </ul> }
    </div>
    );
  }


  componentDidMount() {
    const token = localStorage.getItem('jwt');
    console.log('token react provides to server: ', token)
    

    const requestOptions = {
        headers: {
            Authorization: token,
        },
    };


    console.log('request options: ', requestOptions)

    axios
        .get('http://localhost:9000/api/users', this.state)
        .then(res =>{
            this.setState({users: res.data})
            console.log('res.data: ', res.data)
            console.log('this.state.users =', this.state.users)
        })
        .catch(err => {
            console.error('Axios failed')
        })

    console.log('state', this.state);
  }; 
}

export default Users;