// Dependencies
import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import styled from 'styled-components';

// Components
import HomePage from './HomePage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import UsersPage from './UsersPage';

//Styles
const AppDiv = styled.div`
	display: flex;
	max-width: 880px;
	height: 100vh;
	background: #c7e8f1;
	margin: 0 auto;
`;

class App extends Component {
	logout = () => {
		localStorage.removeItem('jwt');
		// this.props.history.push('/')
	};

	render() {
		return (
			<AppDiv>
				<header className="nav-bar">
					<nav>
						<NavLink exact to="/">
							Home
						</NavLink>
						<NavLink to="/users">Users</NavLink>
						<NavLink to="/login">Login</NavLink>
						<NavLink to="/signup">Sign Up</NavLink>
						<button onClick={this.logout}>Logout</button>
					</nav>
				</header>
				<Route exact path="/" component={HomePage} />
				<Route path="/users" component={UsersPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/signup" component={SignupPage} />
			</AppDiv>
		);
	}
}

export default App;
