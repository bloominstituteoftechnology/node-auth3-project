import React, { useState } from 'react';
import { Ghost } from 'react-kawaii';

import styles from './login.module.css';

const mood = ['blissful', 'lovestruck', 'happy', 'excited', 'sad', 'shocked'];

const Login = () => {
  const [count, setCount] = useState(0);

  const incrementCycle = () => setCount(count < 5 ? count + 1 : 0);

  return (
    <div className={styles.container}>
      <Ghost size={250} mood={mood[count]} color="#fffc00" />
      <div className={styles.buttons}>
        <button className={styles.login} onClick={incrementCycle}>
          login
        </button>
      </div>
    </div>
  );
};

export default Login;
