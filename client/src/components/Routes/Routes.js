import React from 'react';
import { Route } from 'react-router-dom';
import SignIn from '../../views/SignIn';
import SignUp from '../../views/SignUp';
import Users from '../../views/Users';

const Routes = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={SignIn} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/users" component={Users} />
    </React.Fragment>
  )
}
 
export default Routes;