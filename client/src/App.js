import React, { Component } from 'react';
// import axios from 'axios';
import { withRouter, Switch, Route } from 'react-router-dom';

import Register from './components/Register';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      users:[]
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <section>
          <Switch>
            <Route path="/register" component={Register}/>
          </Switch>
       </section>
      </div>
    );
  }
}

export default withRouter(App);
