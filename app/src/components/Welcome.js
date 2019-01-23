import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export class Welcome extends Component {
    render() {
        return (
            <div>
                <p className="title">Welcome to the Authentication Page</p>
                <NavLink to='/signup'>
                    <button>
                        Sign up
              </button>
                </NavLink>
                <NavLink to='/login'>
                    <button>
                        Log in
              </button>
                </NavLink>
            </div>
        )
    }
}

export default Welcome;
