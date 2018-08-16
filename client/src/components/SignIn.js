import React, { Component } from 'react';
import axios from 'axios';


class SignIn extends Component {
    state={
        username:'',
        password:''
    };

    inputHandler= event =>{
        const{ name, value }= event.target;
        this.setState({[name]:value});
    };

    submitHandler=event =>{
        event.preventDefault();
        axios
        .post('http://localhost:7700/login', this.state)
        .then(res =>{
            const token= res.data;
            localStorage.setItem('jwt',token);
        })
        .catch(err=>{
            console.error('Axios failed')
        });
        console.log('state', this.state);
    };

  render() {
    return (
      <div>
        <h1>SignIn</h1>
        <form onSubmit={this.submitHandler}>
            <div>
                <input
                    name='username'
                    value={this.state.username}
                    onChange={this.inputHandler}
                    type="text"
                />
            </div>
            <div>
                <input
                    name='password'
                    value={this.state.password}
                    onChange={this.inputHandler}
                    type='password'
                />
            </div>
            <div>
                <button type='submit'>Sign In</button>
            </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
