import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class Users extends React.Component {
  state = {
    users: [],
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.users.map(user => <p key={user._id}>{user.username}</p>)}
        </ul>
        <Link to="/">
          <button className="home-button">
            Home
          </button>
        </Link>
      </div>  
    );
  }

  componentDidMount() {
    // get the token from somewhere
    const token = localStorage.getItem('jwt');

    // attach the token as the Authorization header
    const requestOptions = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get('http://localhost:5500/api/users', requestOptions)
      .then(response => {
        this.setState({ users: response.data });
        console.log(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }
}

export default Users;