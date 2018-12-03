import React, { useState } from 'react';
import { Ghost } from 'react-kawaii';

import styles from './users.module.css';

const Users = ({ unauthorize }) => {
  const logout = () => {
    window.localStorage.removeItem('jwt');
    window.localStorage.setItem('auth', false);
    unauthorize(false);
  };

  return (
    <div className={styles.container}>
      <Ghost size={250} mood={'lovestruck'} color="#fffc00" />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Users;
