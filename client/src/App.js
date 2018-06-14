import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='register' component={MyComponent} />  
        <Route path='/users' component={MyComponent} />
        
          
      </div>
    );
  }
}



export default App;
