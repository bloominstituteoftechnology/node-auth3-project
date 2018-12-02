import React, { useState } from 'react';
import axios from 'axios';

import Row from '../components/row';
import styles from './AuthForm.module.css';

const AuthForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const credentials = {
      username: username,
      password: password
    };
    axios
      .post('api/login', credentials)
      .then(res => {
        if (res.status === 200) {
          setUsername('');
          setPassword('');
        }
        const token = res.data.token;
        localStorage.setItem('jwt', token);
        props.history.push('users');
      })
      .catch(err => props.setMood('sad'));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <section className={styles.container}>
        <Row label="Username">
          <input
            className={styles.input}
            {...username}
            type="text"
            placeholder="Username"
            required
          />
        </Row>
        <Row label="Password">
          <input
            className={styles.input}
            {...password}
            type="password"
            placeholder="Password"
            required
          />
        </Row>
      </section>
      <button className={styles.button} type="submit">
        {props.label}
      </button>
    </form>
  );
};

export default AuthForm;
