import React from "react";
import styled from "react-emotion";
import { StyledButton } from "../styles/styles";

const Navigator = props => {
  const loginIn = () => {
    if (localStorage.getItem("jwt")) {
      localStorage.removeItem('jwt')
      props.history.push("/login");
    } else {
      props.history.push("/login");
    }
  };



  return (
    <StyledHeader>
      <StyledNav>
        <h1>Sonic The Website</h1>
        <StyledButtonWrapper>
          <HomeButton onClick={() => props.history.push("/")}>Home</HomeButton>
          <LoginButton onClick={loginIn}>
            {localStorage.getItem("jwt") ? 'Log Out': 'Login'}
          </LoginButton>
        </StyledButtonWrapper>
      </StyledNav>
    </StyledHeader>
  );
};

export default Navigator;

const StyledHeader = styled("header")`
  width: 100%;
  background: #013859;
  border-bottom: 3px solid #eb3e4a;
`;

const StyledNav = styled("nav")`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 600px;
  margin: auto;
`;

const StyledButtonWrapper = styled("div")`
  display: flex;
`;

const HomeButton = styled(StyledButton)`
  ${props => {
    if (window.location.pathname === "/")
      return "color: #fffff8; background: #21beda;";
  }};
`;
const LoginButton = styled(StyledButton)`
  ${props => {
    if (window.location.pathname === "/login")
      return "color: #fffff8; background: #21beda;";
  }};
`;
