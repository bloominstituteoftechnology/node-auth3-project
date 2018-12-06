import React, { Component } from 'react';
import Register from './components/Register';
import { Switch,  Route } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <section>
            <Switch>
              <Route path="/register" component={Register} />
            </Switch>
          </section>
      </div>
    );
  }
}

export default App;
