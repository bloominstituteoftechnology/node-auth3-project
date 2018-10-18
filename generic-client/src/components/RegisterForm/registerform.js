import React from 'react';
import PropTypes from 'prop-types';

const RegisterForm = () => {
    return (
      <div>
        <form onSubmit={}>
            <label htmlFor='username'>Username:<input name='username' type='text' /></label>
            <br />
            <label htmlFor='department'>Department:<input name='department' type='text' /></label>
            <br />
            <label htmlFor='password'>Password:<input name='password' type='password' /></label>
            <br />
            <input type='submit'>Register</input>
        </form>
      </div>
    );
}

RegisterForm.propTypes = {

};

export default RegisterForm;
