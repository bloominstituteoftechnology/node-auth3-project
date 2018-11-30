import React from 'react';

import styles from './row.module.css';

const Row = props => (
  <div className={styles.row}>
    <div className={styles.label}>{props.label}</div>
    {props.children}
  </div>
);

export default Row;
