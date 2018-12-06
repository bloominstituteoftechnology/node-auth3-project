import React from 'react';
import styled from 'styled-components'

const SuccessMessage = styled.div`
background: #76323F;
border-radius: 5px;
color: #D7CEC7;
display: flex;
align-items: center;
flex-direction: column;
height: 60vh;
justify-content: space-between;
margin: 3% auto;
padding: 30px 10px;
width: 55%;
`;

const StyledButton = styled.button`
  background: #C09F80;
  border: 1px solid #565656;
  border-radius: 3px;
  color: #565656;
  cursor: pointer;
  padding: 7px;
  margin-top: 10px;

  &&:hover {
    background: #565656;
    border: qpx solid #C09F80;
    color: #C09F80;
  }
`;

const RegSuccess = props => {
    return (
    <SuccessMessage>
    <h3>Registration was successful</h3><h4>Please login with these new credentials</h4>
    <StyledButton onClick={props.goToLogin} >Login Now</StyledButton>
    </SuccessMessage>
    )
}

export default RegSuccess;
