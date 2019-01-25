import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {

    render() {
        return (
        <form >
            <div>
                <label htmlFor="username">Username</label>
                <input name="username" type='text'/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input name="password" type='text'/>
            </div>
            <div>
                <button type='submit'>Sign In</button>
            </div>
    </form>
        );
    }
}

export default Signin;