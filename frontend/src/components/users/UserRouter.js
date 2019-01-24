import React from 'react';
import { Route } from 'react-router-dom';

import Authenticate from '../auth/Authenticate';

import UserList from './UserList';

class UserRouter extends React.Component {
  render() {
    return (
      <div className="Users">
        <Route path="/users" component={UserList} />
      </div>
    );
  }
};

export default Authenticate(UserRouter);