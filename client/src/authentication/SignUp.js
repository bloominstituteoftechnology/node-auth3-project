import React, { useState, useRef } from 'react';
import { Ghost } from 'react-kawaii';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Row from '../components/row';
import styles from './auth.module.css';

const SignUp = props => {
  const [mood, setMood] = useState('blissful');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const usernameInput = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const credentials = { username, password, department: 'sales' };
    try {
      await axios.post('/api/register', credentials);
      props.history.push('/');
    } catch {
      setMood('sad');
      setUsername('');
      setPassword('');
      usernameInput.current.focus();
    }
  };

  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  return (
    <div className={styles.container}>
      <Ghost size={250} mood={mood} color="#fffc00" />
      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.section}>
          <Row label="Username">
            <input
              className={styles.input}
              type="text"
              onChange={handleUsernameChange}
              placeholder="Username"
              value={username}
              maxlength="20"
              name="username"
              ref={usernameInput}
              required
            />
          </Row>
          <Row label="Password">
            <input
              className={styles.input}
              type="password"
              onChange={handlePasswordChange}
              placeholder="Password"
              value={password}
              maxlength="20"
              name="password"
              required
            />
          </Row>
        </section>
        <div className={styles.buttons}>
          <button className={styles.button} type="submit">
            Sign Up
          </button>
          <Link className={styles.link} to="/">
            Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
