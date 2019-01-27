import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Users from "./components/Users";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/users" component={Users}/>
                </div>
            </Router>
        );
    }
}

export default App;
