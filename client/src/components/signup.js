import React, { Component } from 'react'

export default class Signup extends Component {
  render() {
    return (
      <div>
        <form>
            <h1>Sign Up for... </h1>
            <h2>Name:</h2>
            <input name="username"></input>
            <h2>Password:</h2>
            <input name="password"></input>
            <h2>Race:</h2>
            <input name="race"></input>
        </form>
      </div>
    )
  }
}
