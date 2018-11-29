import './SignIn.css';
import React from 'react';

class SignIn extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div className="form-cont">
            
            
                <form>
                    <input name="username" value={this.props.username} onChange={this.props.inputHandler} placeholder="Username"/>
                    <input name="password" value={this.props.password} onChange={this.props.inputHandler} placeholder="Password"  />
                </form>

                <div className="btn" onClick={this.props.login}>Sign In</div>
            </div>
         );
    }
}
 
export default SignIn;