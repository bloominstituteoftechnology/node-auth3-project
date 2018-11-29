import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
const url = "http://localhost:3334";

const SignIn = () => {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  //const [bounced, setBounced] = false;

  const submit = async e => {
    e.preventDefault();
    const reply = await axios.post(`${url}/api/login`, { username, password });
    setPassword("");
    setUser("");
    if (reply.data.token) {
      localStorage.setItem("token", reply.data.token);
      //return <Redirect to="/" />;
    } 
  };

  return (
    <div>
        <h2>SignIn</h2>
      <form onSubmit={submit}>
        <input
          type="text"
          onChange={e => setUser(e.target.value)}
          value={username}
          placeholder="name"
        />
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder="password"
        />
        <button type="submit">Submit</button>
      </form>

      {/* {bounced ? "<h3>Incorrect username or password</h3>" : ""} */}
    </div>
  );
};

export default SignIn;
