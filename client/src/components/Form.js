import React from 'react';
import Button from './Button';
import styled from 'styled-components';

const StyledForm = styled.form`
  padding: 40px;
  display: flex;
  flex-direction: column;
  ${'' /* align-items: center; */} justify-content: center;
`;

const Input = styled.input`
  height: 55px;
  margin: 5px;
  padding: 10px;
  border-radius: 2px;
  border: 1px solid #e6e6e6;
`;

const Form = ({
  username,
  password,
  password2,
  handleSubmit,
  handleChange,
  type,
}) => (
  <StyledForm onSubmit={handleSubmit}>
    <Input
      name="username"
      type="text"
      placeholder="enter username"
      value={username}
      onChange={handleChange}
      autoComplete="off"
    />
    <Input
      name="password"
      type="password"
      placeholder="enter password"
      value={password}
      onChange={handleChange}
      autoComplete="off"
    />
    {type === 'signUp' && (
      <Input
        name="password2"
        type="password"
        placeholder="re-enter password"
        value={password2}
        onChange={handleChange}
        autoComplete="off"
      />
    )}
    <Button type="submit">Submit</Button>
  </StyledForm>
);

export default Form;
