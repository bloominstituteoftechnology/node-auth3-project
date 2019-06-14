import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component
{
  constructor()
  {
    super();
    this.state = { token: null};
  }

  componentWillMount()
  {
    this.setState({token: this.checktoken()});
  }
  componentWillUpdate()
  {
    if(this.state.token && !this.checktoken())
      this.setState({token: null});
  }
  render()
  {
    return (
      <div className="App">
       {this.state.token ? <Home token={this.state.token} errorcb={()=> this.setState({token: this.checktoken()})}/> : <Login logincb={()=> { this.setState({token: this.checktoken()});}}/>}
      </div>
    );
  }

  checktoken()
  {
    let a = localStorage.getItem("jwt");
    if(!a || a === "") return null;
    return a;
  }
}

export default App;

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };
  fail = false;
  processing = false;
  render() {
    return (
      <>
        <h2>Login</h2>
        {this.fail ? <div style={{color: "red"}}>{this.fail}</div> : ""}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username" />
            <input 
              style={{backgroundColor: this.processing ? "lightgray" : "white"}}
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password" />
            <input
              style={{backgroundColor: this.processing ? "lightgray" : "white"}}
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
            />
          </div>

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </>
    );
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.fail = false; this.processing=false;
    if(!this.state || !this.state.username || this.state.username === "" || !this.state.password || this.state.password === "")
      {this.fail = "You must fill in a username and password."; return this.setState(this.state);}
    this.processing = true;
    this.setState(this.state);
    // point this to the login endpoint in your API
    const endpoint = 'http://localhost:5000/api/login';

    axios
      .post(endpoint, this.state)
      .then(res => {
        // store the token to local storage
        localStorage.setItem('jwt', res.data.token);
        this.props.logincb();
      })
      .catch(error => {this.fail = "Invaild Username or Password"; this.processing = false; this.setState(this.state)});
  };
}

class Home extends React.Component {
  constructor()
  {
    super();
    this.state = {users: []};
  }
  componentWillMount()
  {
    //fetch data here;
    axios
    .create({
      headers: {
          token: this.props.token,
          'Content-Type': 'application/json',
      }
    })
    .get("http://localhost:5000/api/users")
    .then(res => this.setState({users: res.data}))
    .catch(error => {localStorage.setItem('jwt', "");this.props.errorcb()})
  }
  render()
  {
    return (
      <div>
        <h3 onClick={()=>{localStorage.setItem('jwt', ""); this.props.errorcb()}} ><button>Logout</button></h3>
        <div>{this.state.users.map((x,i)=> <div key={i}>{x.username}</div>)}</div>
      </div>
    )
  }
}