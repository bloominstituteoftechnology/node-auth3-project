import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      username: '',
      race: '',
      password: ''
    };

  }
  handlechange = (e) => {
    return null
  }
  render() {
    return (
      <div className="App">
        <h4>Please login or register</h4>
        {/* <Route path="/signup" component={} /> */}
        {/* <Route path="/login" component={} /> */}
      </div>
    );
  }
}

export default App;
