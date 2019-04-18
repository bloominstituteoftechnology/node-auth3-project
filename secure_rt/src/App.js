import React, { Component } from 'react';
import './App.css';
import Signin from './components/sign_in';
import Signup from './components/sign_up';
import Authenticate from './components/Auth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
              <ComponentFromAuth />    
        </header>
      </div>
    );
  }
}

const ComponentFromAuth = Authenticate(Signup)(Signin);

export default App;