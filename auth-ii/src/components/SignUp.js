import React from 'react';

const SignUp = () => (
  <div>
    <form className='signup-form'>
      <input type="text" className='firstName' placeholder='First Name'/>	
      <input type="text" className='lastName' placeholder='Last Name'/>
      <input type="password" className='password' placeholder='Password'/>
      <select>
        <option className='department' value='marketing'>Marketing</option>
        <option className='department' value='sales'>Sales</option>
        <option className='department' value='product'>Product</option>
      </select>	
      <input className='btn' type="submit"/>	
    </form>
  </div>
);

export default SignUp;