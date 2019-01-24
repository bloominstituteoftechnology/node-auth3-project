import React from 'react';

import users from '../apis/users';
import history from '../history';

export default class UserList extends React.Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const res = await users.get('/users');
    this.setState({ users: res.data });
  }

  onButtonClick = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    history.push('/');
  };

  renderUsers = () => {
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
  };

  render() {
    return this.renderUsers();
  }
}
