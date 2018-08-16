import React, { Component } from 'react';


class Signin extends Component {
  render() {
    return (
      <div className="Signin">
        <h1>Singin Component</h1>
        <form action="">
          <div><label htmlFor=""></label><input type="text"/></div>
          <div><label htmlFor=""></label><input type="text"/></div>
          <div><button type="button">Signin</button></div>
        </form>
      </div>
    );
  }
}

export default Signin;
