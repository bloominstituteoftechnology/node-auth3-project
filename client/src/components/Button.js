import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  height: 50px;
  margin: 5px;
  border: none;
  border-radius: 2px;
  background-color: #5e985c;
  color: white;
`;

const Button = ({ type, children, handleClick }) => (
  <StyledButton type={type} onClick={handleClick}>
    {children}
  </StyledButton>
);

export default Button;
