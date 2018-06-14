import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import RegisterandLoginForm from './components/RegisterandLoginForm';
import Users from './components/Users';

class App extends Component {
  constructor() {
   super();
    this.state = {
      signin: false
    }
  }

  takeToSignUP = () => {
    this.props.history.push('/signup');
    this.setState({
      signin: true
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />          
        </header> 
        <div>
            { this.state.signin ? null:            
              <button onClick={this.takeToSignUP}>push to signup</button>
            }
          </div>             
        <Route path="/signin" component={RegisterandLoginForm}/>
        <Route path="/signup" component={RegisterandLoginForm}/> 
        <Route path="/users" component={Users}/>
      </div>
    );
  }
}

export default withRouter(App);
