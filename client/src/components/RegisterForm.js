import React from 'react';

export default function Register(props) {
    return(
        <form onSubmit={props.submitHandler}>
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
                <label>Department</label>
                <input 
                    type="text"
                    name="department"
                    value={props.department}
                    onChange={props.changeHandler}
                />
            </div>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    );
}