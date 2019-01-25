import React from 'react';
import axios from 'axios';

import { Spinner } from './Spinner';

const makeOptions = () => ({
  headers: {
    Authorization: localStorage.getItem('token')
  }
});

export default class UserList extends React.Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const res = await axios.get(
      'http://localhost:4020/api/users',
      makeOptions()
    );
    this.setState({ users: res.data });
  }

  onButtonClick = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    this.props.history.push('/');
  };

  renderUsers = () => {
    if (this.state.users.length) {
      return (
        <>
          <ul>
            {this.state.users.map(user => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
          <button onClick={this.onButtonClick}>Sign Out</button>
        </>
      );
    } else {
      return <Spinner />;
    }
  };

  render() {
    return this.renderUsers();
  }
}
