import React, { Component } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Users from './components/Users';
import TopBar from './components/TopBar';
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
                <TopBar />
                <Route exact path="/users" component={Users} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
            </div>
        );
    }
}

export default App;
