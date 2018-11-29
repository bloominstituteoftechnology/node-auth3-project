import './SignUp.css';
import React from 'react';

class SignUp extends React.Component {
    state = {  }
    render() { 
        return ( 
        <div className="form-cont">
           <form>

               <input name="username" value={this.props.username} onChange={this.props.inputHandler} placeholder="username"/>
               <input name="password" value={this.props.password} onChange={this.props.inputHandler} placeholder="Password"  />
               <input name="department" value={this.props.department} onChange={this.props.inputHandler} placeholder="Department" />

           </form>
           <div className="btn" onClick={this.props.submit} >Sign Up</div>
        </div> 
        );
    }
}
 
export default SignUp;