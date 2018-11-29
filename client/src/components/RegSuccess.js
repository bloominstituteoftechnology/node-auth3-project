import React from 'react';
import styled from 'styled-components'

const SuccessMessage = styled.div`
  background-color: gray;
  border: 1px solid black;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 10vh auto;
  padding: 10%;
  width: 70%;
`;

const StyledButton = styled.button`
  border: 1px solid gray;
  border-radius: 3px;
  cursor: pointer;
  padding: 10px;
  margin-top: 10%;
`;

const RegSuccess = props => {
    return (
    <SuccessMessage>
    <h3>Registration successful. Please login with these new credentials.</h3>
    <StyledButton onClick={props.goToLogin} >Login Now</StyledButton>
    </SuccessMessage>
    )
}

export default RegSuccess;
