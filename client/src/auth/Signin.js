import React, { Component } from 'react';
import './Signin.css';


class Signin extends Component {
  render() {
    return (
      <div className="Signin">
        <h1> Sign in Component </h1>
        <form action="">
            <div><label htmlFor=""></label><input type="text"/></div>
            <div><label htmlFor=""></label><input type="text"/></div>
            <div>
                <button type="button">
                    <Signin></Signin>
                </button>
            </div>
        </form>
      </div>
    );
  }
}

export default Signin;