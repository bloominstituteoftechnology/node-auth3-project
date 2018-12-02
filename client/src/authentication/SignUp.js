import React, { useState } from 'react';
import { Ghost } from 'react-kawaii';

import styles from './auth.module.css';

const SignUp = () => {
  const [mood, setMood] = useState('blissful');

  return (
    <div className={styles.container}>
      <Ghost size={250} mood={mood} color="#fffc00" />
    </div>
  );
};

export default SignUp;
