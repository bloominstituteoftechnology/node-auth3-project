import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  font-size: 2rem;
  text-decoration: none;
  color: black;
  cursor: pointer;
  }
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  render() {
    return (
      <div className="App">
        <StyledLink to="/signup">Sign up!</StyledLink>
        <div>
          <Route path="/signup" render={props => <SignUp {...props} />} />
        </div>
      </div>
    );
  }
}

export default App;
