import React  from 'react'
import PropTypes from 'prop-types';

const LoginForm = props => {
  return (
    <form className='login-form'>
      <label htmlFor='username'>Username</label>
      <input
        onChange={props.handleChange}
        placeholder="Username"
        value={props.username}
        name="username"
      />
      <label htmlFor='password'>password</label>
      <input
        onChange={props.handleChange}
        placeholder="password"
        value={props.password}
        name="password"
        type="password"
      />
      <button onClick={props.login}>Submit</button>
    </form>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm;
