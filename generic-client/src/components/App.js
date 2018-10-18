import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Nav from './Nav/nav';
import Home from './Home/home';
import RegisterForm from './RegisterForm/registerform';
import LoginForm from './LoginForm/loginform';
import UsersList from './UsersList/userlist';

const GlobalStyle = createGlobalStyle`
    .activeLink {
        background-color: lightgray;
    }
`;

class App extends Component {
	render() {
		return (
			<div>
				<GlobalStyle />
				<Nav {...this.props} />
				<Route exact path="/" component={Home} />
				<Route path="/signup" component={RegisterForm} />
				<Route path="/signin" component={LoginForm} />
				<Route path="/users" component={UsersList} />
			</div>
		);
	}
}

export default withRouter(App);
