import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  state = {
    users: [],
  };

  render() {
    return (
      <div>
          <ul>
              {this.state.users.map(user => (
              <li key={user.id}>{user.username} from {user.department}</li>
              ))}
          </ul>
      </div>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const reqOptions = {
        headers: {
            Authorization: token,
        },
    };

    axios
        .get('http://localhost:3900/api/users', reqOptions)
        .then(res => {
            console.log('users data:', res.data);
            this.setState({ users: res.data.users }); // or this.setState({ users: res.data }) if using res.json( users ); in the server index file for the get/api/users endpoint
        })
        .catch(err => {
            console.error('Axios Failed', err ); // res.response.data
            this.props.history.push('/signin');
        });
    // console.log('state', this.state);
  };
}

export default Users;