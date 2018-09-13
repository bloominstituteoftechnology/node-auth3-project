import React from 'react';

const AuthForm = ({ submit,
                    change,
                    username,
                    password,
                    isRegistering,
                    department }) => {
  return(
    <form onSubmit={submit}>
      <div>
        <label>Username</label>
        <input
          name="username"
          value={username}
          onChange={change}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={change}
        />
      </div>
      {isRegistering &&
        <div>
          <label>Department</label>
          <input
            name="department"
            value={department}
            onChange={change}
          />
        </div>
      }
      </form>
  );
}

export default AuthForm;
