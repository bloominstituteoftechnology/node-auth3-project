import { createGlobalStyle } from 'styled-components';
import { reset } from 'reset-css';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  ${reset};
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,700&display=swap');

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  h1 {
    font-size: ${theme.fontSizing.l}
  }

  div#root {
    ${theme.flex('column', 'flex-start', 'center')}

    width: 100%;
    height: 100vh;

    font-family: 'Open Sans', sans-serif;
    background-color: #454f4f;
  }  
`;

export default GlobalStyle;
