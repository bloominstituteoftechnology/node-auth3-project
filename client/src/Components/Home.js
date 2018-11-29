import React from 'react';
import styled from 'styled-components'
const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  align-items: center;
  height: 50vh;
  justify-content: center;
  font-size: 44px;
  font-weight: 600;
  max-width: 50%;
  margin: 0 auto;
  font-family: Helvetica;
  border-radius: 15px;
  background: lightgray;
  button {
    border: 2px solid black;
    width: 100px;
    height: 25px;
    border-radius: 15px;
    margin: 0 40px 20px 40px;
  }
  p{
    padding: 50px;
  }
`;

const Home = props => {
  return (
    <Container>
      <p>Welcome</p>
      <div>
      <button
        onClick={() => {
          props.history.push('/signin');
        }}>
        LOGIN
      </button>
      <button
        onClick={() => {
          props.history.push('/signup');
        }}>
        SIGN UP 
      </button>
      </div>
    </Container>
  );
};

export default Home;
