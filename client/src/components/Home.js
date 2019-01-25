import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const HomePage = styled.div`
  display: flex;
  justify-content: center;
  font-size: 26px;

  a{
    margin: 20px;
    padding: 8px 12px;
    border: 2px solid black;
    border-radius: 10px;
    text-decoration: none;
    color: black;

    &:hover{
      color: white;
      background-color: black;
    }
  }
`;

class Home extends Component {
  render() {
    return (
      <HomePage>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/users">Users</Link>
      </HomePage>
    );
  }
}

export default Home;