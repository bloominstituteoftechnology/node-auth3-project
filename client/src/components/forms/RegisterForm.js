import React from 'react'
import PropTypes from 'prop-types'

const RegisterForm = props => {
  return (
    <form>
      <input
        onChange={props.handleChange}
        placeholder="Username"
        value={props.username}
        name="username"
      />
      <input
        onChange={props.handleChange}
        placeholder="password"
        value={props.password}
        name="password"
        type="password"
      />
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
