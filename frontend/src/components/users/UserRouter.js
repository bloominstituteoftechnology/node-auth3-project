import React from 'react';
import { Route } from 'react-router-dom';

import Authenticate from '../auth/Authenticate';

import UserList from './UserList';

class UserRouter extends React.Component {
  render() {
    return (
      <>
        <Route path="/users" component={UserList} />
      </>
    );
  }
};

export default Authenticate(UserRouter);