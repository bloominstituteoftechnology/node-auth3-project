import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from "react-router-dom";
import { Link} from "react-router-dom";
import SignupForm from './components/SignupForm';
import Home from "./components/Home";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Home} />
        {/* <Route path="/signin" component={SigninForm} /> */}
        <Route path="/register" component={SignupForm} />
      </div>
    );
  }
}

export default App;
