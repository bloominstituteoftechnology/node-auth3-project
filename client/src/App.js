import React, { Component } from 'react';
import './App.css';
import {withRouter,Route} from 'react-router-dom';
import SignUp from './components/signUp';

class App extends Component {
  componentDidMount() {
    this.props.history.push('/signup');
  }
  render() {
    return (
      <div className="App">
       <Route path='/signup' component={SignUp}/>
      </div>
    );
  }
}

export default withRouter(App);
