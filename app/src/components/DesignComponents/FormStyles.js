import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.flex('row', 'center')}
  width: 100%;

  margin-top: 50px;
`;

export const Form = styled.form`
  ${({ theme }) => theme.flex('column', 'center', 'center')}
  width: 500px;
  padding: 10px;
  border: 1px solid black;

  input,
  button {
    width: 100%;
    margin: 5px;
  }
`;
