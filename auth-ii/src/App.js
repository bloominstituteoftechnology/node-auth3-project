import React from 'react';
import { Route, Switch} from 'react-router-dom';
import './App.css';
import { Home, SignUp, SignIn, Users, Navigation } from './components';
// import { Home } from './components/';
import WrongURL from './components/WrongURL';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }


//   use create-react-app to generate a application to server as the client for the Web API.
// inside the React application add client-side routes and components for signup, signin and showing the list of users stored in the database.
// the /signup route should provide a form to gather username, password and department for the user and make a POST request to the /api/register route on the API. If the user is created successfully, take the returned token, save it to the browser's local storage and redirect the user to the /users route, where they should see the list of users.
// the /signin route should provide a form to gather username and password for the user and make a POST request to the /api/login route on the API. Upon successful login, persist the returned token to the browser's local storage and redirect the user to the /users route.
// the /users route should read the token from local storage and make a GET request to the /api/users route on the API attaching the token as the value of the Authorization header.
// provide a button to sign out that will remove the token from local storage.


  render() {
    return (
      <div className='App'>
        <Navigation />
        
        <Switch>
          <div className='Nav-Bar2'>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/users' component={Users} />
          </div>
        <Route component={WrongURL} />
        </Switch> 
      </div>
    )
  }
} 



export default App;