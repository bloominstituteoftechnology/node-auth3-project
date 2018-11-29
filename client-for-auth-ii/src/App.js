import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Register from './components/Register';
import './styles/App.css';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Routes and stuff! */}
        <Navbar />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default App;
