import React, { Component } from 'react';
import '../App.css';
import {Route} from 'react-router-dom';
import axios from 'axios'

class Users extends Component {
  state = {
      users: ''
  }  
  render() {
    return (
      <div className="Users">
        {this.state.users.map(users => {
            <ul>
                <li key = {user.id}>
                    {user.username}
                </li>
            </ul>
        })}        
      </div>
    );
  }


  componentDidMount() {
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

export default Login;