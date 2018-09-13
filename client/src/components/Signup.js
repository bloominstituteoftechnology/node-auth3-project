import React from "react";
import { Link } from "react-router-dom";

function Login(props) {
  return (
    <div>
      <input
        name="username"
        type="text"
        placeholder="enter your username"
        onChange={props.inputHandler}
      />
      <input
        name="password"
        type="password"
        placeholder="enter your password"
        onChange={props.inputHandler}
      />
      <input
        name="department"
        type="text"
        placeholder="enter your department"
        onChange={props.inputHandler}
      />
      <button onClick={props.onSubmit} name="register">
        Login
      </button>
      <Link to="/">already a user</Link>
    </div>
  );
}

export default Login;
