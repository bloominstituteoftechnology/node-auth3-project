import React from 'react';

const RegisterForm = props => {
  return (
    <form className='register-form'>
      <label htmlFor='username'>Username</label>
      <input
        onChange={props.handleChange}
        placeholder="Username"
        value={props.username}
        name="username"
      />
      <label htmlFor='password'>Password</label>
      <input
        onChange={props.handleChange}
        placeholder="password"
        value={props.password}
        name="password"
        type="password"
      />
      <label htmlFor='department'>Department</label>
      <select name="department" value={props.department} onChange={props.handleChange}>
        <option value="manager">Manager</option>
        <option value="developer">Developer</option>
        <option value="engineer">Engineer</option>
      </select>
      <button onClick={props.register}>Register</button>
    </form>
  )
}

RegisterForm.propTypes = {

}

export default RegisterForm;
