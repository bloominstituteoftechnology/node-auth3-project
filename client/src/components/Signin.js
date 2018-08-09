import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
    state= {
        username: '',
        password: ''
    };

  render() {
    return (
      <div className="Signin">
        <h1>Signin</h1>
            <form onSubmit={this.submitHandler}>
                <div>
                    <input 
                        name="username"
                        value={this.state.username} 
                        onChange={this.inputChangeHandler}
                        type="text" 
                    />
                </div>
                <div>
                    <input 
                        name="password"
                        value={this.state.password} 
                        onChange={this.inputChangeHandler}
                        type="password" 
                    />
                </div>
                <div>
                    <button type="submit">Signin</button>
                </div>
            </form>
      </div>
    );
  }

  inputChangeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitHandler = event => {
      event.preventDefault();
      console.log('state', this.state);

      axios
        .post('http://localhost:8000/api/login', this.state)
        .then(res => {
            const token =  res.data;
            localStorage.setItem('jwt', token);
            this.props.history.push('/api/users');
        })
        .catch(err => {
            console.error('Axios Failed');
        });

  }
}

export default Signin;