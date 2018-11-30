import React from "react";
import UsersList from "./components/UsersList";
import { Route, NavLink } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

const App = () => {
  return (
    <div>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/signup'>Sign up</NavLink>
        <NavLink to='/signin'>Sign in</NavLink>
      </nav>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/" component={UsersList} />
      
    </div>
  );
};

export default App;
