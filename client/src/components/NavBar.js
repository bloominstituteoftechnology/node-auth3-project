import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const NavHolder = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
width: 100%;
background: #F0EFF0;
height: 10vh;
`;

const StyledNav = styled.nav`
  display: flex;
  font-size: 1rem;
  justify-content: space-between;
  width: 50%;
  align-items: center;
`;

const active = {
  color: '#76323F',
  fontWeight: 'bold',
}

const NavBar = () => {
  const logout = () => {
    localStorage.removeItem('super_secret');
  }
    return (
      <NavHolder>
      <h3>Department List</h3>
    <StyledNav>
      <NavLink to='/signin' activeStyle={active} >Login Existing User</NavLink>
      <NavLink to='/signup' activeStyle={active} >Register New User</NavLink>
      <NavLink to='/home' activeStyle={active} >Home</NavLink>
      <NavLink to='/' onClick={logout}>Logout</NavLink>
    </StyledNav>
    </NavHolder>
    )
}

export default NavBar;
