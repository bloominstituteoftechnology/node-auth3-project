import React, { Component } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Users from './components/Users';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            authenticated: false,
        };
    }

    render() {
        return (
            <div className="App">
                <Route exact path="/" component={Users} />
                <Login />
            </div>
        );
    }
}

export default App;
