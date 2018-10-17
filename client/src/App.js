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
	render() {
		return (
			<AppDiv>
				<header className = 'App-header'>
					<h1>Lambda Auth II</h1>

					<div className = 'links'>
						<Link to = '/'>Home</Link>
						<Link to = 'signin'>Sign In</Link>
						<Link to = 'signup'>Sign Up</Link>
						<Link to ='/users'>User List</Link>
					</div>
				</header>

				<Route exact path = '/' component = { Home} />

				<Route path = '/signup' component = { Signup } />

				<Route path = '/signin' component = { Signin } />

				<Route path = '/users' component = { Users } />
			</AppDiv>
		);
	}
}

export default App;
