import React from 'react';
import axios from 'axios';

export default class Users extends React.Component {
  state = {
    users : [],
  };

  componentDidMount() {
    if (window.localStorage.getItem('token')) {
      const tok = JSON.parse(window.localStorage.getItem('token'));
      axios
        .get('http://localhost:3300/api/users', { headers: { Authorization: tok } })
        .then(res => {
          console.log(res);
          this.setState({ users: res.data });
        })
        .catch(e => {
          console.log(e);
        });
    }
    else {
      this.props.history.push('/unauthorized');
    }
  }

  render() {
    return (
      <div>
        {this.state.users.map(user => {
          return (
            <div>
              <p>Faculty Member: {user.username}</p>
              <p>Department: {user.department}</p>
            </div>
          );
        })}

        <button
          onClick={() => {
            window.localStorage.removeItem('token');
            this.props.history.push('/');
          }}>
          Logout
        </button>
      </div>
    );
  }
}
