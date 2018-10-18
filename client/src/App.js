import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

// Components
import {
	Home,
	Signup,
	Signin,
	Users,
} from './components/index.js';

// Styles and Animations
import styled from 'styled-components';
import TweenMax, { TimelineMax } from 'gsap';

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

	.message {
		text-align: center;
	}
`;

class App extends Component {
	state = {
		username: '',
		department: '',
		message: '',
		sendMessage: false,
	};

	// reference to the DOM node for GSAP use
	messageElem = null;

	goTo = (path, message) => {
		return this.setState({ message: message, sendMessage: true }, () => this.props.history.push(path));
	};

	handleSignout = e => {
		e.preventDefault();
		localStorage.removeItem('jwtToken');
		this.setState({
			username: '',
			department: '',
		}, () => this.goTo('/'));
	};

	componentDidUpdate(prevProps, prevState) {
		const localToken = JSON.parse(localStorage.getItem('jwtToken'));
		// if message changes, animate it
		if (this.state.sendMessage) {
			this.setState({ sendMessage: false }, () => {
			// kill all the animations first
			TweenMax.killAll();
			// add a timeline
			const messageTimeline = new TimelineMax({});
			messageTimeline
				.to(this.messageElem, 0, { opacity: 0 })
				.to(this.messageElem, 2, { opacity: 1 })
				.to(this.messageElem, 1, { opacity: 0 });
			});
		}
		// if there is a token and no user info stored in state, store the info
		// from the token in the state
		if (localToken && !this.state.username) {
			return this.setState({
				username: localToken.username,
				department: localToken.department,
			});
		}
		// if there is no token, but user info is stored in state, remove that info
		// from the state
		if (!localToken && this.state.username) {
			return this.setState({
				username: '',
				department: '',
			});
		}
	};

	render() {
		const {
			username,
			department,
			message,
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

				<p ref = { p => this.messageElem = p } className = 'message'>{ message }</p>

				<Route exact path = '/' render = { () => <Home username = { username } department = { department } /> } />

				<Route path = '/signup' render = { () => <Signup goTo = { this.goTo } /> } />

				<Route path = '/signin' render = { () => <Signin goTo = { this.goTo } /> } />

				<Route path = '/users' render = { () => <Users goTo = { this.goTo } signout = { this.handleSignout } /> } />
			</AppDiv>
		);
	}
}

export default App;
