import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavBar = styled.nav`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

export const StyledLink = styled(NavLink)`
  padding: 20px;
  text-decoration: none;
  font-size: 20px;
  color: black;
  transition: 0.1s;
  width: 8%;

  :hover {
    color: blue;
    font-size: 25px;
  }
`;

export const StyleBtn = styled.button`
  text-decoration: none;
  background-color: white;
  border: 2px solid red;
  font-size: 15px;

  :hover {
    background-color: red;
    color: white;
    border: 2px solid black;
  }
`;

export const Inputform = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
  /* align-items: center; */
  margin: 0 auto;
`;

export const SubmitBtn = styled.button`
  text-decoration: none;
  background-color: white;
  border: 2px solid blue;
  font-size: 15px;
  width: 20%;
  align-self: center;

  :hover {
    background-color: blue;
    color: white;
    border: 2px solid black;
  }
`;

export const Inputs = styled.input`
  width: 40%;
  /* align-items: center; */
  margin: 0 auto;
  margin-bottom: 20px;
`;

export const LoginLabel = styled.label`
  font-size: 25px;
  font-weight: bold;
`;
