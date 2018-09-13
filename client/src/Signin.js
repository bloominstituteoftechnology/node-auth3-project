import React, { Component } from 'react';

//import './Signin.css';

class Signin extends Component {
  render() {
    return (
      <div className="Signin">
        <form> 
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
}

export default Signin;