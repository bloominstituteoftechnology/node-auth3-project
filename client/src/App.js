import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

// Components
import {
	Home,
	Signup,
	Signin,
	Users,
} from './components/index.js';

// Styles
import styled from 'styled-components';

const AppDiv = styled.div`
	background-color: #444;
	min-height: 100vh;
	color: white;

	header {
		margin-bottom: 20px;

		h1 {
			text-align: center;
			font-size: 2rem;
			padding: 10px;
		}

		.links {
			display: flex;
			justify-content: space-evenly;

			a {
				text-decoration: none;
				color: white;
				border: 1px solid white;
				border-radius: 5px;
				padding: 5px 10px;

				&:hover {
					background-color: black;
					cursor: pointer;
				}
			}
		}
	}
`;

class App extends Component {
	state = {
		username: '',
		department: '',
	};

	goTo = path => {
		return this.props.history.push(path);
	};

	handleSignout = e => {
		e.preventDefault();
		localStorage.removeItem('jwtToken');
		this.setState({
			username: '',
			department: '',
		}, () => this.goTo('/'));
	};

	componentDidUpdate() {
		const localToken = JSON.parse(localStorage.getItem('jwtToken'));
		// if you are signed out and there is a token in localStorage, sign in
		if (!this.state.username && localToken) {
			return this.setState({
				username: localToken.username,
				department: localToken.department,
			});
		}
	};

	render() {
		const {
			username,
			department,
		} = this.state;
		return (
			<AppDiv>
				<header className = 'App-header'>
					<h1>Lambda Auth II</h1>

					<div className = 'links'>
						<Link to = '/'>Home</Link>
						<Link to = 'signin'>Sign In</Link>
						<Link to = 'signup'>Sign Up</Link>
						<Link to ='/users'>User List</Link>
						{ username && <button onClick = { this.handleSignout }>Sign Out</button> }
					</div>
				</header>

				<Route exact path = '/' render = { () => <Home username = { username } department = { department } /> } />

				<Route path = '/signup' component = { Signup } />

				<Route path = '/signin' render = { () => <Signin goTo = { this.goTo } /> } />

				<Route path = '/users' render = { () => <Users goTo = { this.goTo } /> } />
			</AppDiv>
		);
	}
}

export default App;
