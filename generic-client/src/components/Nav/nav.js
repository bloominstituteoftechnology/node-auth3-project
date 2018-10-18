import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

const LinkDiv = Styled.div`
    display: flex;
`;

const Nav = () => {
    return (
      <LinkDiv>
        <NavLink exact to='/' activeClassName='activeLink'>Home</NavLink>
        <NavLink to='/register' activeClassName='activeLink'>Register</NavLink>
        <NavLink to='/login' activeClassName='activeLink'>Login</NavLink>
        <NavLink to='/userslist' activeClassName='activeLink'>Users List</NavLink>
      </LinkDiv>
    );
};

Nav.propTypes = {

};

export default Nav;
