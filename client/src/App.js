import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import Users from "./Components/Users";

class App extends Component {
	render() {
		return (
			<div className="App">
				<header>
					{/* <Link to="/">Home</Link>
					<Link to="/login">Login</Link>
					<Link to="/users">Users</Link> */}
				</header>
				<Route exact path="/" render={() => <Login />} />
				<Route exact path="/signup" render={() => <SignUp />} />
				<Route exact path="/users" render={() => <Users />} />
			</div>
		);
	}
}

export default App;
