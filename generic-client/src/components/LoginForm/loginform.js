import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = () => {
    return (
      <div>
        <form onSubmit={} >
            <label htmlFor='username'>Username:<input name='username' type='text' /></label>
            <br />
            <label htmlFor='password'>Password:<input name='password' type='password' /></label>
            <br />
            <input type='submit'>Login</input>
        </form>
      </div>
    );
}

LoginForm.propTypes = {

};

export default LoginForm;
