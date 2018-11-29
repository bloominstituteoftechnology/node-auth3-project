import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  max-width: 512px;
  margin: 0px auto 28px auto;
  padding: 62.12px 99px 48px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  text-align: left;
  font-size: 1.8rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
`;

export const Input = styled.input`
  border-radius: 7px;
  color: #333333;
  border: 1px solid #e6e6e6;
  padding: 12px 16px;
  font-size: 18px;
  width: 300px;
  height: 45px;
  margin: 5px 0;
`;

export const Button = styled.button`
  height: 45px;
  font-size: 18px;
  cursor: pointer;
  width: 300px;
  text-align: center;
  padding: 0 20px;
  margin: 5px 0;
  border-radius: 7px;
  background: #36b9bd;
  color: #fff;
  opacity: 0.9;
  &:hover {
    opacity: 1;
    transition: all 0.4s ease 0s;
  }
`;

export const Heading = styled.h2`
  font-size: 40px;
  text-align: center;
  margin: 20px 0;
  color: 545454;
`;
