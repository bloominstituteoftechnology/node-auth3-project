import React from 'react';
import { Ghost } from 'react-kawaii';
import { Link } from 'react-router-dom';

import styles from './landing.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <Ghost size={250} mood="happy" color="#fffc00" />
      <div className={styles.buttons}>
        <Link className={styles.login} to="/signup">
          sign up
        </Link>
        <Link className={styles.login} to="login">
          login
        </Link>
      </div>
    </div>
  );
};

export default Login;
