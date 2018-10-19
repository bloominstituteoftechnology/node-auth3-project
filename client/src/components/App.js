import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';

import HomeView from './views/HomeView';
import RegisterView from './views/RegisterView';
import LoginView from './views/LoginView';
import UsersView from './views/UsersView';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <NavLink to='/register'>
            <button>Register</button>
          </NavLink>

          {/* <NavLink to='/signin'>
            <button>Log In</button>
          </NavLink>

          <NavLink to='/users'>
            <button>Show Users</button>
          </NavLink> */}
        </header>

        <Route exact path='/' render={() => <HomeView {...this.props} />} />
        <Route path='/signup' render={() => <RegisterView {...this.props} />} />
        <Route path='/signin' render={() => <LoginView {...this.props} />} />
        <Route path='/users' render={() => <UsersView {...this.props} />} />
      </div>
    );
  }

  logout = () => {
    localStorage.removeItem('jwt');
  }
}

// const mapStateToProps = state => {
//   return {
//     loggingIn: state.loggingIn,
//     isLoggedIn: state.isLoggedIn,
//     loggingOut: state.loggingOut,
//     fetchingUsers: state.fetchingUsers,
//     // addingSmurf: state.addingSmurf,
//     // deletingSmurf: state.deletingSmurf,
//     error: state.error
//   }
// }

export default withRouter(App);