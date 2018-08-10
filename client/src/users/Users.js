import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  state= {
    users: [],
  }

  render() {
    return (
      <div className="SignIn">
        <div>
          <ul>
          </ul>
        </div>        
      </div>
    );
  }

  inputChangeHandler = event => {
    // handle the input change > update state
    const { name, value } = event.target;
    // console.log('name', name, 'value', value);
  
    this.setState({ [name]: value });
  }
  
 componentDidMount() {
    const token = localStorage.getItem('jwt');

    const requestOptions = {
      headers: {
        Authorization: token,
      }
    };

    axios
      .get('http://localhost:3300/login', requestOptions)
      .then(res => {
        this.setState({ users: res.data });
      })
      .then(res => {
        console.log('state', this.state);
      })
      .catch(err => {
        console.error('Axios failed');
      })
      
  }
}


export default Users;