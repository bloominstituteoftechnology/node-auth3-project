import React, { useContext } from 'react';
import * as S from './NavStyles';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <S.Nav>
      <NavLink exact to='/' activeStyle={{ color: '#aaa' }}>
        HOME
      </NavLink>
      <NavLink exact to='/login' activeStyle={{ color: '#aaa' }}>
        LOGIN
      </NavLink>
      <NavLink exact to='/register' activeStyle={{ color: '#aaa' }}>
        REGISTER
      </NavLink>
      <NavLink to='/users' activeStyle={{ color: '#aaa' }}>
        USERS
      </NavLink>
    </S.Nav>
  );
};

export default Nav;
