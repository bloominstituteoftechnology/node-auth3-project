import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Users extends Component {
  state = {
    users: [],
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const URL = 'http://localhost:8000/api/users';
    if (token) {
      axios
        .get(URL, { headers: { Authorization: token }})
        .then(response => {
          this.setState({ users: response.data })
        })
        .catch(err => console.log(err))
    } else {
      setTimeout(() => window.location.pathname = '/', 3000)
    }
  }

  logout = () => {
    localStorage.removeItem('token');
    window.location.pathname = '/';
  }

  render() {
    return(
      <Fragment>
        {!localStorage.getItem('token') ? (
          <p>You are not logged in. Redirecting...</p>
        ) : (
          <Fragment>
            <Link to='/'>
              <button type='button' className='logout' onClick={this.logout}>
                Logout
              </button>
            </Link>
            {this.state.users.map(user => {
              return (
                  <div className='user' key={user.id}>
                    <p>{user.username}</p>
                    <p>{user.department}</p>
                  </div>
              )
            })}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default Users;