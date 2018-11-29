import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: 'bummings',
      password: 'password'
    };
  }

  componentDidMount() {
    // this.getData();
    console.log(this.state);
  }

  // getData = () => {
  //   axios
  //     .get('http://localhost:8000/api/users')
  //     .then(response => {
  //       console.log(response.data);
  //       this.setState({ users: response.data });
  //     })
  //     .catch(err => console.log(err));
  // };

  render() {
    return (
      <div className='App'>
        <h1>test</h1>
        {/*                 */}
        <form onSubmit={this.handleSubmit}>
          <div className='form'>
            <div className='form__input'>
              <label htmlFor='username'>Username</label>
              <input
                name='username'
                value={this.state.username}
                onChange={this.handleInputChange}
                type='text'
              />
            </div>
            <div className='form__input'>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                value={this.state.password}
                onChange={this.handleInputChange}
                type='password'
              />
            </div>
            <div className='form__btn'>
              <button type='submit'>Sign In</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const endpoint = 'http://localhost:8000/api/login';
    console.log(this.state);
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log('big time error bruh', err);
      });
  };
}

export default App;
