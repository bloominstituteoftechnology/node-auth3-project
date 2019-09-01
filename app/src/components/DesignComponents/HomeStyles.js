import styled from 'styled-components';

const Container = styled.div`
  ${({ theme }) => theme.flex('row', 'center')}
  width: 100%;

  margin-top: 50px;
`;

export default Container;
