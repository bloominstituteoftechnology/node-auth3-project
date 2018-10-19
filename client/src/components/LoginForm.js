import React from 'react';

export default function LoginForm(props) {
    return(
        <form>
            <div>
                <label>Username</label>

                <input 
                    type="text"
                    name="username"
                    value={props.username}
                    onChange={props.changeHandler}
                />
            </div>

            <div>
                <label>Password</label>

                <input 
                    type="password"
                    name="password"
                    value={props.password}
                    onChange={props.changeHandler}
                />
            </div>

            <div>
                <button type="submit" onClick={props.loginHandler}>Sign In</button>
            </div>
        </form>
    );
}