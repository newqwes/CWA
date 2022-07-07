import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import 'antd/dist/antd.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

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

.ag-group-contracted, .ag-group-expanded {
  margin-right: 10px !important;
}

.ag-cell, .ag-header-cell {
  padding-left: 10px !important;
}

`;

export default GlobalStyle;
