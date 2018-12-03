import React, { useState, useRef } from 'react';
import { Ghost } from 'react-kawaii';
import axios from 'axios';

import Row from '../components/row';
import styles from './auth.module.css';

const Login = props => {
  const [mood, setMood] = useState('blissful');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const usernameInput = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const credentials = { username, password };
    try {
      const res = await axios.post('/api/login', credentials);
      localStorage.setItem('jwt', res.data.token);
      localStorage.setItem('auth', true);
      props.authorize(true);
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
              name="password"
              required
            />
          </Row>
        </section>
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
