import React from 'react';

const SignIn = () => (
  <div>
    <form className='signin-form'>
      <input type="text" className='username' placeholder='username'/>	
      <input type="password" className='password' placeholder='Password'/>
      <input className='btn' type="submit"/>	
    </form>
  </div>
);

export default SignIn;