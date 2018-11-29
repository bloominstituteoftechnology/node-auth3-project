import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section>
            <Switch>
              <Route path= "/register" component={Register}/>
              <Route path="/login" component={Login}/>
            </Switch>
        </section>
      </div>
    );
  }
}

export default App;
