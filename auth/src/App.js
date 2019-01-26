import React, { Component } from 'react';
import axios from 'axios';
import User from './components/User';
import { Input } from 'reactstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      username: "",
      password: "",
      department: "",
      display: true,
      disabled: true,
      userList: [],
      userInfo: []
    })
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

   handleSubmit = event => {
    event.preventDefault();
    const credentials = this.state;
    const endpoint = 'http://localhost:3300/api/login';
    axios.post(endpoint, credentials)
      .then(res => {
        console.log('reponse data from login', res.data);
        localStorage.setItem('jwt', res.data.token);
        alert("login successful")
        const name = "";
        const password = "";
        this.setState({ username: name, password: password })
        console.log("this.state is: ", this.state)
      }).catch(err => {
        console.log('err from login', err);
      });
  }
  // ********* USER LOGIN **************************
  login = (e) => {
    e.preventDefault();
    if (this.state.username && this.state.password) {
      const userInfo =
      {
        username: this.state.username,
        password: this.state.password,
        department: this.state.department
      };
      const endpoint = 'http://localhost:3300/api/login';
      axios
      .post('http://localhost:3300/api/login', userInfo)
        .then(res => {
          console.log('reponse data from login', res.data);
          localStorage.setItem('jwt', res.data.token);
          alert('Login successful...')
          const passWord = "";
          const userName = "";
          const departMent = "";
          this.setState(() => ({ username: userName, password: passWord, department: departMent, display: false, disabled: false }))
        })
        .catch(err => {
          console.error('err from login', err);
        });
    } else {
      alert('Please enter a username, password and department')
    }
  }

  // ************ USER REGISTER ***************************
  register = (e) => {
    e.preventDefault();
    if (this.state.username && this.state.password && this.state.department) {
      const userInfo =
      {
        username: this.state.username,
        password: this.state.password,
        department: this.state.department
      };
      axios
        .post('http://localhost:3300/api/register', userInfo)
        .then(response => {
          alert('registration complete...')
          let passWord = "";
          let userName = "";
          let departMent = "";
          this.setState(() => ({ username: userName, password: passWord, department: departMent }))
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    } else {
      alert('Please enter a username and password')
    }
  }

  // ************ GET USER LIST *******************
  userList = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwt');
    const endpoint = 'http://localhost:3300/api/users';
    const options = {
      headers: {
        Authorization: token
      }
    };
     axios
      .get('http://localhost:3300/api/users/', options)
      //.then(res => {
        .then(response => {
           let tmpArray = [];
           for (let x = 0; x < response.data.length; x++) {
             tmpArray.push(response.data[x].username)
          }
           this.setState(() => ({ userList: tmpArray }));
         })
      
      
      //  console.log('data from /api/users', response.data);
      //  this.setState({ users: res.data })
     // })
      
      //.then(response => {
       // let tmpArray = [];
       // for (let x = 0; x < response.data.length; x++) {
       //   tmpArray.push(response.data[x].username)
      //  }
      //  this.setState(() => ({ userList: tmpArray }));
      //})
      .catch(error => {
        console.error('Server Error', error);
      });
      //************************************ */
          
    /*   Axios.get(endpoint, options)
        .then(res => {
          console.log('data from /api/users', res.data);
          this.setState({ users: res.data })
        }).catch(err => {
          console.log('error from api/users', err)
        })
  
    } */
  }

  // ***************** USER LOGOUT **************************
  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt')
    alert("User has successfully signed out")
    this.setState(() => ({ userList: [], display: true, disabled: true }));
  }
    
    
 /*    axios
      .post('http://localhost:3300/api/logout')
      .then(response => {
        alert('logout successful')
        this.setState(() => ({ userList: [], display: true, disabled: true }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  } */

  // **** USER MESSAGE JUST SOME HUMOR *****
  message = () => {
    alert("Sorry, we dont know it either... #BestSecurityEver");
  }

  render() {
    // *** CODE TO CHANGE THE LOGOUT AND USERLIST BUTTONS TEXT COLOR ****
    let classNames = require('classnames');

    let btnClass = classNames({
      btnLogout: true,
      'btnNoWork': this.state.display
    })
    return (
      <div className="App">
        <header className="main-header">
          <div className="title">Auth-ii Application/Lambda School
          </div>
        </header>
        <div className="container-1">
          <div className="text"><p>This is a sample app written to demonstrate the use of jws
         for handling login's. You must first register. When complete use your registration info
         to login. To view the list of users, select the User List button. Click logout when you are finished</p> </div>
          <form className="main-form" onSubmit={this.login}>
            <Input type="text" id="username" value={this.state.username} name='username' className="form-control" placeholder="Enter Username" onChange={this.handleInputChange} />
            <Input type="text" id="password" value={this.state.password} name='password' className="form-control" placeholder="Enter Password" onChange={this.handleInputChange} />
            <Input type="text" id="department" value={this.state.department} name='department' className="form-control" placeholder="Enter Department" onChange={this.handleInputChange} />

            <button className="btn-register" value="register" onClick={this.register} name="viewHome" id="register">Register</button>
            <button type="submit" className="btn-login" value="login" onSubmit={this.login} name="viewHome" id="login">Login</button>
            <button className={btnClass} disabled={this.state.disabled} value="user-list" id="user-list" onClick={this.userList} name="viewHome">User List</button>
            <button className={btnClass} disabled={this.state.disabled} value="logout" id="logout" onClick={this.logout} name="viewHome">Logout</button>

          </form>
          <div className="message" onClick={this.message}><p>Click Here if you forgot your password.</p> </div>
          <div className={btnClass}>New User List:{this.state.userList.map((user, index) => {
            return <User user={user} key={index} />;
          })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

