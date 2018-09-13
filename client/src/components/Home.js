import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    32deg,
    rgba(94, 152, 92, 1) 0%,
    rgba(0, 128, 128, 1) 100%
  );
`;

const LinkWrap = styled.div`
  display: flex;
  padding: 7px;
`;

const Header = styled.h1`
  color: white;
  font-weight: bold;
  font-size: 20px;
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 16px;
  padding: 5px;
`;

const Home = props => (
  <HomeWrap>
    <Header>Please sign in to view your content.</Header>
    <LinkWrap>
      <StyledLink to="/login">Log In</StyledLink>
      <StyledLink to="/signup">Sign Up</StyledLink>
    </LinkWrap>
  </HomeWrap>
);

export default Home;
