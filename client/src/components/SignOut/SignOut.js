import React, { Component } from 'react';

class SignOut extends Component {
  signOut = () => {
    localStorage.removeItem('authiiToken');
    this.props.history.push('/');
  }
  render() { 
    return (
      <button onClick={this.signOut}>Sign Out</button>
    )
  }
}
 
export default SignOut;