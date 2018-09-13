import React from 'react';
import style from './style.module.css';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  render() {
    return (
      <div className={style.card}>
        <h1 className={style.heading}>Login</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.onSubmit(this.state);
            this.setState({ username: '', password: '' });
          }}
        >
          <div className={style.inputGroup}>
            <input
              className={style.input}
              type="text"
              placeholder="Username"
              autoComplete="off"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
            <label className={style.label}>Username</label>
          </div>
          <div className={style.inputGroup}>
            <input
              className={style.input}
              type="password"
              placeholder="Password"
              autoComplete="off"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <label className={style.label}>Password</label>
          </div>
          <button className={style.button} type="submit">
            Submit &rarr;
          </button>
          <p className={style.status}>{this.props.status}</p>
        </form>
      </div>
    );
  }
}

export default Login;
