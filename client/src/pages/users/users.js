import React from 'react';

import styles from './users.module.css';

const Users = props => {
  const logout = () => {
    window.localStorage.removeItem('jwt');
    props.logout(false);
  };

  return (
    <div className={styles.container}>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Users;
