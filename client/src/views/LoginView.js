import React, { Component } from 'react';
import axios from 'axios';

class LoginView extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
    console.log(this.props);
    
  }

  handleInput = (e) => {
    e.preventDefault();
    console.log(`logging typing: ${e.target.value}`);
    
  }


  render(){
    return( 
    <form>
      <input type="text" value="" name="username" placeholder="Username" onChange={this.handleInput}/>
        <input type="text" value="" name="password" placeholder="Password" onChange={this.handleInput}/>
        <input type="submit" value="Login" />
    </form> 
    )
  }
}

export default LoginView;