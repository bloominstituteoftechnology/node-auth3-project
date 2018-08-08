import React from 'react';

const Signup = (props) => {
    return (
        <div>
            <form>
                <input name='username' value={props.username} placeholder='Username...' onChange={props.handleChange} />
                <input name='password' value={props.password} placeholder='Password...' onChange={props.handleChange} />
                <input name='department' value={props.department} placeholder='Department...' onChange={props.handleChange} />
            </form>
        </div>
    );
}
 
export default Signup;