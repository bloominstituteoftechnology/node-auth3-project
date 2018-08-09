import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
import {Button} from 'reactstrap'

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount = () => {
    const token = localStorage.getItem('jwt');

    const requestOptions = {
        headers: {
            Authorization: token
        }
    };

    axios
        .get('http://localhost:8000/users', requestOptions)
        .then((response) => {
          this.setState({ users: response.data })
        })
        .catch(err => console.log(err));
  }

  logoutHandler = event => {
      localStorage.removeItem('jwt');
  }

  render() {
    return (
      <div className="formWrapper">
          <h1>Users</h1>
            {this.state.users.map(user => <div key={user.id}>{user.username}</div>)}
            <Button color="danger" onClick={this.logoutHandler}>Log out</Button>
      </div>
    );
  }
}

export default Users;