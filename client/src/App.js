import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Users from './components/Users';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <section>
          <Switch>
            <Route path="/users" component={Users} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
