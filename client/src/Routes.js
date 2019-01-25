import React from 'react';
import { Route } from 'react-router-dom';
import Users from './users/Users';
import Signin from './auth/Signin';
import Register from './auth/Register';
import Home from './auth/home.js'
import App from './App';
import './App.scss';

class Routes extends React.Component {
  constructor(){
    super()
    this.state = {
      loggedIn: false
    }
   this.toggleLogin = this.toggleLogin.bind(this);
   this.logOut= this.logOut.bind(this);
   this.login = this.login.bind(this);
   this.checkToken = this.checkToken.bind(this);
  }
  
  toggleLogin(e){
    console.log('clicked')
    if (this.state.loggedIn === false) {
    this.setState({loggedIn:true})
    } else {
      this.logOut();
      this.setState({ loggedIn:false });
    }
  }
  logOut() {
    localStorage.removeItem('jwt')
    this.setState({loggedin:false})
  }
  login(){
    this.setState({loggedIn:true})
  }
  checkToken() {
    if (localStorage.getItem('jwt') === null) {
      this.setState({ loggedIn: false })
    }
  }
  componentDidMount(){
  this.checkToken();
  }
  

  render() {
    return (
      <div className='App'>
        <App loggedIn={this.state.loggedIn} toggleLogin={this.toggleLogin} />
        {console.log(this.state)}
        <Route path='/' component={Home} exact></Route>
        <Route path='/users' exact render={props => (<Users loggedIn={this.state.loggedIn} setLoginState={this.setLoginState} />)}></Route>
        <Route path='/signin' exact render={props => (<Signin login={this.login} />)}></Route>
        <Route path='/register' exact render={props => (<Register login={this.login} />)}></Route>
      </div>
    )
  }
}

export default Routes;

