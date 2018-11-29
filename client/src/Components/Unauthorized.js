import React from 'react';
import styled from 'styled-components';
import  Count  from './Count';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  align-items: center;
  height: 50vh;
  justify-content: center;
  font-size: 14px;
  font-family: Helvetica;
  border-radius: 15px;
  background: lightgray;
  max-width: 50%;
  margin: 0 auto;

  p {
    font-size: 28px;
  }
`;

const Unauthorized = props => {
  setTimeout(() => {
    props.history.push('/');
  }, 8500);
  return (
    <Container>
      <p>Sorry, you shouldn't be here... :( but you can be! Here's how!</p>
      <p>...redirecting back to main screen in <Count /> seconds</p>
    </Container>
  );
};

export default Unauthorized;
