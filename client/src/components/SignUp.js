import React from 'react';
import style from './style.module.css';

class SignUp extends React.Component {
  render() {
    return (
      <div className={style.card}>
        <h1 className={style.heading}>Sign Up</h1>
        <form>
          <div className={style.inputGroup}>
            <input
              className={style.input}
              type="text"
              placeholder="Username"
              autoComplete="off"
            />
            <label className={style.label}>Username</label>
          </div>
          <div className={style.inputGroup}>
            <input
              className={style.input}
              type="password"
              placeholder="Password"
              autoComplete="off"
            />
            <label className={style.label}>Password</label>
          </div>
          <div className={style.inputGroup}>
            <input
              className={style.input}
              type="text"
              placeholder="Department"
              autoComplete="off"
            />
            <label className={style.label}>Department</label>
          </div>
          <button className={style.button} type="submit">
            Submit &rarr;
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
