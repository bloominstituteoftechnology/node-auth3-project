import React from 'react';
import styled from 'styled-components';

const Button = ({ type, children, handleClick }) => (
  <button type={type} onClick={handleClick}>
    {children}
  </button>
);

export default Button;
