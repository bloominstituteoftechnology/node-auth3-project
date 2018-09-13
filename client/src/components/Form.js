import React from 'react';
import Button from './Button';
import styled from 'styled-components';

const Form = ({
  username,
  password,
  password2,
  handleSubmit,
  handleChange,
  type,
}) => (
  <form onSubmit={handleSubmit}>
    <input
      name="username"
      type="text"
      placeholder="enter username"
      value={username}
      onChange={handleChange}
      autoComplete="off"
    />
    <input
      name="password"
      type="password"
      placeholder="enter password"
      value={password}
      onChange={handleChange}
      autoComplete="off"
    />
    {type === 'signUp' && (
      <input
        name="password2"
        type="password"
        placeholder="re-enter password"
        value={password2}
        onChange={handleChange}
        autoComplete="off"
      />
    )}
    <Button type="submit">Submit</Button>
  </form>
);

export default Form;
