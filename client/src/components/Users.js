import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      headers: {
        Authorization: token,
      },
    };
    axios.get('http://localhost:3300/users', requestOptions)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => {
        console.error('Axios Failed');
      })
  }
  handleLogout = e => {
    localStorage.removeItem('jwt')
    this.props.history.push('/signin');
  }
  render() {
    return (
      <div>
        {/* Logout Button */}
        {localStorage.getItem('jwt') && (
          <button onClick={this.handleLogout}>Logout</button>
        )}
        <ul>
          {this.state.users.map(user => {
            return (
              <div key={user.id}>
                <li>{user.username}</li>  
                <li>{user.department}</li>
              </div>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default Users;