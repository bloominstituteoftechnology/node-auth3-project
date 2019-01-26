import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import styled from 'styled-components';

const HeaderDiv = styled.div `
position:relative;
z-index:4;
background:white;
top:3;
padding-top:5px;
padding-bottom:20px;
text-align: center;
`
class Home extends React.Component{
    constructor(props){
      super(props);
    }
    signout=()=>{
      localStorage.removeItem('jwtToken');
      this.props.history.push('/login');
    }
    render(){
    return(
      <HeaderDiv>
        <h1>
          Welcome to Client Authentication.
        </h1>
        <NavLink to='/login'>Login</NavLink>
        &nbsp;&nbsp;
        <NavLink to='/register' >Register</NavLink>
        &nbsp;&nbsp;
        <NavLink to='/users'>Users</NavLink>
        &nbsp;&nbsp;
        <button onClick={this.signout} >Log out</button>
  
      </HeaderDiv>
    )}
  }
  export default withRouter(Home);