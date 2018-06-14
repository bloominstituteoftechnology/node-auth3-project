import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { loadToken, saveToken } from './utils/localStorage';
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

  componentDidMount = () => {
    const token = loadToken();
    this.setState({ token });
  }

  sendToken = token => {
    saveToken(token);
    this.setState({ token });
  }

  renderLogin = (props) => <Login {...props} send={this.sendToken} />;
  renderUsers = (props) => <Users {...props} send={this.sendToken} token={this.state.token} />;
  
  render() {

    return (
      <div className='App mv3 mh4 tc'>
        <h1 style={{"font-family":"'Corben', sans-serif","font-size":"4rem"}}>Ron's Silly App</h1>
        <Switch>
          <Route exact path='/' render={(props)=><Welcome {...props} token={this.state.token}/>}/>
          <Route path='/login' render={(props)=>this.renderLogin(props)} />
          <Route path='/register' render={(props)=>this.renderLogin(props)} />
          <Route path='/users' render={(props)=>this.renderUsers(props)} />
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
