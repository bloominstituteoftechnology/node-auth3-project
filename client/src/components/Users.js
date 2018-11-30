import React, { Component } from 'react';
// import {Link, NavLink } from 'react-router-dom';

// const Users = () => (
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loggedIn: false,
      // users: [],
      ...users
    }
  }

  render() {
    console.log('THIS', this.state.users)
    return (
      <div className='users'>
        <i className='fas fa-users'></i>
        <i className='fas fa-users'></i>
        <i className='fas fa-users'></i>
          <ol>
            {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
          </ol>
          ))}
      </div>
    )
  }
};

                {/*
                  <ol>
                    {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
                  </ol> */}

export default Users;