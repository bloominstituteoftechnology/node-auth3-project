import React from 'react';

const Signup = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSignup} >
                <input name='username' value={props.username} placeholder='Username...' onChange={props.handleChange} />
                <input name='password' value={props.password} placeholder='Password...' onChange={props.handleChange} />
                <input name='department' value={props.department} placeholder='Department...' onChange={props.handleChange} />
                <button onClick={props.handleSignup}>Sign Up</button>
            </form>
        </div>
    );
}
 
export default Signup;