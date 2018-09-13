import React, { Component } from 'react';

//import './Signin.css';

class Signin extends Component {
    state = {
        username: '',
        password: '',
    };
    
  render() {
    return (
      <div className="Signin">
        <form onSubmit = {this.signin}> 
            <div> 
                <label> Username </label>
                <input type = "text" />
            </div>
            <div> 
                <label> Password </label>
                <input type = "password" />
            </div>
            <div> 
                <button type = "submit"> Sign in</button>
                <input type = "text" />
            </div>
        </form>
      </div>
    );
  }

signin = event => {
    event.preventDefault();
    console.log(this.state);
    }
}

export default Signin;