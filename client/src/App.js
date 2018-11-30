import React from 'react';
import { Route, Switch, NavLink, withRouter } from 'react-router-dom';
import { Home, SignUp, SignIn, Users, Navigation } from './components';
import WrongURL from './components/WrongURL';
import axios from 'axios';
import './App.css';

import UserList from './components/UserList';

const url = process.env.REACT_APP_API_URL;

const users = [
  {
    firstName: 'Gem',
    lastName: 'P',
    username: 'GemP',
    id: Date.now(),
    password: 'password',
    department: 'product'
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      // users: []
      users,
    };
  }

  authenticate = () => {
    const token = localStorage.getItem('secret_bitcoin_token');
    const options = {
      headers: {
        authorization: token,
      },
    };

    if (token) {
      axios.get(`${url}/api/users`, options)
        .then((res) => {
          console.log('RES', res.data)
          if ((res.status === 200 || res.status === 201) && res.data) {
            this.setState({ loggedIn: true, users: res.data.users });
          }
          else {
            throw new Error();
          }
        })
        .catch((err) => {
          this.props.history.push('/users'); //login
          
        });
    } else {
      this.props.history.push('/'); //login
    }
  }

  componentDidMount(){
    this.authenticate();
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    // console.log('this.props', this.props);
    // console.log('prevProps', prevProps);
    if (pathname === '/' && pathname !== prevProps.location.pathname) {
      this.authenticate();
    }
  }


  render() {
    return (
      <div className='App'>
        <Navigation />  
        {/* <UserList 
        users={this.state.users}
        />     */}
          <Switch>
            <div className='Nav-Bar2'>
            <Route exact path='/' component={Home} />
            <Route 
              exact path='/signup'
              component={SignUp}
                />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/users' component={Users} />
            </div>
          <Route component={WrongURL} />
        </Switch> 
      </div>
    )
  }
} 



export default withRouter(App);


//  render={props => <SignUp {...props} addUser={newUser => this.state.addUser(newUser)} />} 