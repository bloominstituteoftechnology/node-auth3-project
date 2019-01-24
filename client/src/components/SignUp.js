import React from 'react';

const SignUp = () => {
  return (
    <div>
      <div>Sign up now!</div>
      <form>
        <label>
          <input type="text" placeholder="Username.." />
        </label>
        <label>
          <input type="text" placeholder="Password.." />
        </label>
        <label>
          <input type="text" placeholder="Department.." />
        </label>
      </form>
    </div>
  );
};

export default SignUp;
