import React, { Component } from 'react';
import axios from 'axios';

class users extends Component {
  state = {
    users: ''
  };
  async componentDidMount() {
    try {
      const token = localStorage.getItem('token');
      const options = {
        headers: {
          Authorization: token
        }
      };
      console.log(options);
      const response = await axios.get(
        'http://localhost:9000/api/users',
        options
      );
      console.log(response);
      this.setState({ users: response.data });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.users ? (
            this.state.users.map(item => {
              return <li>{item.username}</li>;
            })
          ) : (
            <li>No users please login</li>
          )}
        </ul>
      </div>
    );
  }
}

export default users;
