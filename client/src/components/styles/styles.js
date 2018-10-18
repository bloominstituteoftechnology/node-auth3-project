import styled from 'react-emotion'

export const StyledButton = styled("div")`
  font-weight: bold;
  text-transform: uppercase;

  padding: 5px;
  margin: 0 10px;
  transition: all 0.1s;

  :hover {
    background: #21beda;
    color: #fffff8;
    transform: scale(1.1)
  }

  border-radius: 2px;
`;