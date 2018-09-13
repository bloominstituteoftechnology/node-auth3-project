import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import img from '../assets/img.png';

const Wrap = styled.div`
  display: flex;
  height: 100%;
  background: #fff;
`;

const Img = styled.div`
  background-image: URL(${img});
  width: 50%;
`;

const FormWrapper = styled.div`
  width: 50%;
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
`;

const LinkWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  padding-left: 2px;
  text-decoration: none;
  color: #5e985c;
  font-weight: bold;
`;

const Header = styled.h1`
  font-size: 25px;
  padding-left: 40px;
`;

const AuthWrap = ({ children, type }) => (
  <Wrap>
    <Img />
    <FormWrapper>
      <Header>{type === 'signUp' ? 'Welcome.' : 'Welcome back.'}</Header>
      {children}
      {type === 'signUp' ? (
        <LinkWrap>
          <p>Already Have an Account?</p>
          <StyledLink to="/login">Log In</StyledLink>
        </LinkWrap>
      ) : (
        <LinkWrap>
          <p>Don't Have an Account?</p>
          <StyledLink to="/signup">Sign Up</StyledLink>
        </LinkWrap>
      )}
    </FormWrapper>
  </Wrap>
);

export default AuthWrap;
