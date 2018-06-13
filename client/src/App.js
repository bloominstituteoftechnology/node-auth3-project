import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
// Pages
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Users from './pages/Users';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: undefined,
    }
  }

  sendToken = token => {
    this.setState({ token });
  }

  render() {
    const renderLogin = (props) => <Login {...props} send={this.sendToken} />;
    const renderUsers = (props) => <Users {...props} token={this.state.token} />;

    return (
      <div className='App'>
        <h1>Ron's Silly App</h1>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/login' render={(props)=>renderLogin(props)} />
          <Route path='/register' render={(props)=>renderLogin(props)} />
          <Route path='/users' render={(props)=>renderUsers(props)} />
          <Route render={() => {
            return (
              <div>
                <h1>404: Not found</h1>
                <Link to='/'>Go back to safety.</Link>
              </div>
            );
          }} />
        </Switch>
      </div>
    );
  }
}

export default App;
