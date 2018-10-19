import React, { Component } from 'react';
import axios from 'axios';

class Lgn extends Component {
  state = {
    usrs_nme: '',
    usrs_pwd: '',
  };

  hdliptchg = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  hdlsbmt = event => {
    event.preventDefault();

    console.log(this.state);
    axios
      .post('http://localhost:5000/api/lgn', this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('jwt', res.data.tkn);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <form onSubmit={this.hdlsbmt}>
        <div>
          <label htmlFor="usrs_nme">Username</label>
          <input
            name="usrs_nme"
            value={this.state.usrs_nme}
            onChange={this.hdliptchg}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="usrs_pwd">Password</label>
          <input
            name="usrs_pwd"
            value={this.state.usrs_pwd}
            onChange={this.hdliptchg}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}

export default Lgn;