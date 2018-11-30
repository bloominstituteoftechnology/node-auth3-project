import React, { useState } from 'react';
import { Ghost } from 'react-kawaii';

import Form from './AuthForm';
import styles from './login.module.css';

const Login = () => {
  const [mood, setMood] = useState('blissful');

  return (
    <div className={styles.container}>
      <Ghost size={250} mood={mood} color="#fffc00" />
      <Form setMood={setMood} />
    </div>
  );
};

export default Login;
