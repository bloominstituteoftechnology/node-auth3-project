import styled from 'styled-components';

export const Nav = styled.div`
  width: 100%;
  padding: 10px 20px;

  text-align: right;

  border-bottom: 1px solid black;

  a {
    color: white;
    text-decoration: none;
    font-size: ${({ theme }) => theme.fontSizing.l};
    margin: 0 20px;
  }
`;
