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
      <div className='users'>
        {/* Logout Button */}
        {localStorage.getItem('jwt') && (
          <div className='btn' onClick={this.handleLogout}>Logout</div>
        )}
        <div className='users-list'>
          {this.state.users.map(user => {
            return (
              <div key={user.id} className='user'>
                <p>{user.username}</p>  
                <p>{user.department}</p>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Users;