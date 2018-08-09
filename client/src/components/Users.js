import React from 'react';
import axios from 'axios';
import User from './User';

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    console.log('TOKEN', token);
    const requestOptions = {
      headers: { Authorization: token },
    };
    axios
      .get('http://localhost:3000/api/users', requestOptions)
      .then(res => {
        // we're sent an array of users
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.error('axios err:', err);
      });
  }

  render() {
    return this.state.users.map(u => <User key={u.id} user={u} />);
    // return <User />;
  }
}

export default Users;
