import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './components/register'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
        </header>
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
