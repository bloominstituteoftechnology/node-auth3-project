import React, { Component } from 'react';
import { AuthContext } from '../AuthProvider';

class Header extends Component {
  render() {
    return (
      <div>
        <AuthContext.Consumer>
          {({ state, logout }) => {
            if (state.user.username) {
              return (
                <div>
                  <div>Hello {state.user.username}</div>
                  <button onClick={() => logout()}>Logout</button>
                </div>
              );
            }
          }}
        </AuthContext.Consumer>
      </div>
    );
  }
}

export default Header;
