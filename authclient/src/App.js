import React, { Component } from 'react';
import { NavLink, Route} from 'react-router-dom';
import './App.css';

////JB Generated
import Users from './users/Users';
import Login from './auth/Login';

const Home = props => {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         <nav>
            <NavLink to="/">Home</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/login">Log In</NavLink>
         </nav>
         <main>
           <Route path="/" component={Home} exact></Route>
           <Route path="/users" component={Users}></Route>
           <Route path="/login" component={Login}></Route>
         </main>
        </header>
      </div>
    );
  }
}

export default App;
