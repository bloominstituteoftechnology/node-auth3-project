import React from 'react';
import { Ghost } from 'react-kawaii';

import styles from './login.module.css';

const Login = () => (
  <div className={styles.container}>
    <Ghost size={250} mood="blissful" color="#fffc00" />
    <div className={styles.buttons}>
      <button className={styles.login}>sign up</button>
      <button className={styles.login}>login</button>
    </div>
  </div>
);

export default Login;
