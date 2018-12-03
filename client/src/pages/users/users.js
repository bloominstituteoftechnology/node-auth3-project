import React from 'react';
import { Ghost } from 'react-kawaii';

import styles from './users.module.css';

const Users = ({ unauthorize, users }) => {
  console.log(users);
  const logout = () => {
    window.localStorage.removeItem('jwt');
    window.localStorage.setItem('auth', false);
    unauthorize(false);
  };

  const renderUsers = () =>
    users.map(user => (
      <li key={user.id} className={styles.user}>
        {user.username}
      </li>
    ));

  return (
    <div className={styles.container}>
      <Ghost size={250} mood={'blissful'} color="#fffc00" />
      <section className={styles.section}>
        <div className={styles.content}>
          <h3>
            Ghost Users...{' '}
            <span role="img" aria-label="ghost">
              👻
            </span>
          </h3>
          <ul className={styles.users}>{renderUsers()}</ul>
        </div>
        <button className={styles.button} onClick={logout}>
          Logout
        </button>
      </section>
    </div>
  );
};

export default Users;
