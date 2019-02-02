import React, {Component} from 'react';
// import axios from 'axios';

class Signin extends Component {
    render() {

        return (
            <div className="signin">
            <p>hello world</p>
            <form>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" placeholder="Username"/>
                </div>
     
                <div>
                    <label htmlFor="username">Password: </label>
                    <input type="password"placeholder="Password"/>
                </div>

                <div>
                    <label htmlFor="username">Department: </label>
                    <input type="text" placeholder="Department"/>
                </div>
               
                <div>
                    <button type="submit">Sign In</button>
                </div>
            </form>
            </div>
        )}
}

export default Signin;
