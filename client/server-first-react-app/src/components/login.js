import React, { Component } from 'react';

class Login extends Component {

    render() {
        return (
            <React.Fragment>
                <form action="">
                    <input 
                        placeholder="User Name" 
                        name="username" 
                        value="this.props.inputValue.username" 
                        type="text" 
                        onChange={this.props.handleInput}  
                    />
                    <input 
                        placeholder="Password" 
                        name="password" 
                        value="this.props.inputValue.password" 
                        type="password" 
                        onChange={this.props.handleInput}  
                    />
                    <button onSubmit={this.props.handleSubmit}>Submit</button>
                </form>
            </React.Fragment>
        )
    }
}
export default Login;
