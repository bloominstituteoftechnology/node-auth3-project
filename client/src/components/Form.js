import React from 'react';
import '../App.css';

const Form = props => {
  const heading = props.type === "register" ? "Sign up:" : "Sign in:";
  const buttonName = props.type === "register" ? "Create account" : "Log in";

  return (
    <div>
      <h2>{heading}</h2>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={props.username}
          onChange={props.handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={props.password}
          onChange={props.handleInputChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={props.department}
          onChange={props.handleInputChange}
        />
        <button onClick={props.handleFormSubmit}>{buttonName}</button>
      </form>
    </div>
  );
}

export default Form;
