import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

const LinkDiv = Styled.div`
    display: flex;
`;

const PseudoLink = Styled.div``;

class Nav extends Component {
	logout = () => {};

	render() {
		return (
			<LinkDiv>
				<NavLink exact to="/" activeClassName="activeLink">
					Home
				</NavLink>
				&nbsp;|&nbsp;
				<NavLink to="/signup" activeClassName="activeLink">
					Register
				</NavLink>
				&nbsp;|&nbsp;
				<NavLink to="/signin" activeClassName="activeLink">
					Login
				</NavLink>
				&nbsp;|&nbsp;
				<NavLink to="/users" activeClassName="activeLink">
					Users List
				</NavLink>
				&nbsp;|&nbsp;
				<PseudoLink onClick={this.logout}>Logout</PseudoLink>
			</LinkDiv>
		);
	}
}

Nav.propTypes = {};

export default Nav;
