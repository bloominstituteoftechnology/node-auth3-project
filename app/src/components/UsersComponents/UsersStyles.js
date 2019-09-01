import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.flex('column', 'center', 'center')}
  width: 100%;

  margin-top: 50px;

  div {
    ${({ theme }) => theme.flex('column', 'flex-start', 'flex-start')}
    width: 300px;
    margin: 10px;

    color: white;
    font-size: ${({ theme }) => theme.fontSizing.m};
  }
`;
