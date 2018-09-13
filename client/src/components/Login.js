import React from "react";
import {Link} from 'react-router-dom'

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
      <button onClick={props.onSubmit} name="login">
        Login
      </button>
      <Link to="/register">new user?</Link>
    </div>
  );
}

export default Login;
