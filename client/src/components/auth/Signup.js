import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor() {
    super();
    this.state = { username: '', password: '', department: '' };
  }
  componentDidMount() {}

  handleInput(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      department: this.state.department,
    };

    if (!user.username || !user.password) {
      //do nothing
      alert('Please fill in username and password');
    } else {
      axios
        .post('http://localhost:9000/api/register', user)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem('jwt', response.data.token);
          this.props.history.push('/users');
        })
        .catch((err) => console.log(err));

      this.setState({ username: '', password: '', department: '' });
    }
  }
  render() {
    return (
      <form>
        <input
          type="text"
          name="username"
          value={this.state.username}
          placeholder="Username"
          onChange={(event) => this.handleInput(event)}
        />
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={(event) => this.handleInput(event)}
          placeholder="Password"
        />
        <input
          type="text"
          name="department"
          value={this.state.department}
          placeholder="Department"
          onChange={(event) => this.handleInput(event)}
        />
        <button onClick={(event) => this.handleSubmit(event)}>Sign-Up</button>
      </form>
    );
  }
}

export default Signup;
