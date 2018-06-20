import React from 'react';
// import { eventNames } from 'cluster';

class Signin extends React.Component{
    state = {
        username: 'sam',
        password: 'mellon'
    };
    render(){
        return(
            <form onSubmit= {this.submitHandler}>
                <div>
                    <label>Username</label>
                    <input 
                    value={this.state.username} 
                    onChange={this.inputChangeHandler} 
                    name="username" 
                    type="text"/>
                    <label htmlFor="username"/>
                </div>

                <div>
                    <input 
                    id="username"
                    value={this.state.password} 
                    onChange={this.inputChangeHandler} 
                    name="password" 
                    type="text"/>
                    <label htmlFor="password"/>
                </div>

                <div><button type="submit">Signin</button></div>
            </form>
        )
    }
    submitHandler = event => {
        console.log(this.state);
    }
    inputChangeHandler = event => {
        console.log('changing', event.target.name)
    }
}
export default Signin;