import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import axios from 'axios';

class User extends Component {
    constructor(){
      super();
      this.state = {
        users: [],
        username: '',
        race: ''
      }
    }
  
  componentDidMount() {
    axios
      .get('http://localhost:5500/api/users')
      .then(response => {
        this.setState(() => ({users: [...response.data]}));
      })
      .catch(err => {
        console.log("error", err)
      });
  }
  
    render(){
      return (
        <div className="App">
          <ul>
            {this.state.users.map(user => {
              return (
                <li key={user}>
                  <p>Username: {user.username}</p>
                  <p>Race: {user.race}</p>
                </li>
              )
            })}
          </ul>
        </div>
      );
    }
  }

  export default User