import React from 'react';
import './App.css';
import Login from './components/Login';
import { Route, NavLink } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <header>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
            </header>
            <Route path="/login" component={Login} />
        </div>
    );
}

export default App;