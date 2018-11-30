import React, { lazy, Fragment, Suspense } from 'react';
import { Route } from 'react-router-dom';

import Landing from './landing/landing';
import { ReactComponent as Circle } from '../assets/svgs/circles.svg';
import styles from './App.module.css';
const Login = lazy(() => import('../components/authentication/Login'));
const SignUp = lazy(() => import('../components/authentication/SignUp'));
const Users = lazy(() => import('./users/users'));

const App = () => (
  <Fragment>
    <Route exact path="/" component={Landing} />
    <Suspense
      fallback={
        <div className={styles.container}>
          <Circle />
        </div>
      }
    >
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/users" component={Users} />
    </Suspense>
  </Fragment>
);

export default App;
