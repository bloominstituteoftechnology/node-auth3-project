import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
      <div className='welcome'>
    <h2>Hi there!</h2><h2> Please <Link to='/signin'>Login</Link> or <Link to='/signup'>Register</Link></h2></div>
    )
}

export default Welcome;
