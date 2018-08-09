import React from 'react';


class Register extends React.Component {

    render() {
    return (
        <div>
            <h3>Register</h3>
        <form>
          <input
            type='text'
            name='name'
            placeholder='Choose a username'

            />
          <input
            type='password'
            name='password'
            placeholder='Choose a password'

            />
            <button>Register</button>
            </form>
        </div>
    )}
}

export default Register;
