import React, { Component } from "react";

class Signin extends Component {
  render() {
    return (
      <div className="Signin">
        <h1>Signin Component</h1>
        <form>
          <div>
            <input type="text" id="username" />
          </div>
          <div>
            <input type="text" />
          </div>
          <div>
            <button type="button">Sign In</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signin;
