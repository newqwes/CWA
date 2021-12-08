import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
${normalize}

html {
  width: 100vw;
  overflow-x: hidden;
}

ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
`;

export default GlobalStyle;
