import React, { Component } from "react";
import { Router, Link } from "react-router-dom";

const Home = props => {
  return (
    <div>
      <h1>Welcome!</h1>
      <h2>
        <Link to="/signin"> Sign In</Link> or <Link to="/signup"> Sign Up</Link>
        !
      </h2>
    </div>
  );
};

export default Home;
