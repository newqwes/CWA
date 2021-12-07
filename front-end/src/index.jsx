import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import store from './store/configureStore';
import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';
import { DEFAULT_THEME } from './constants/theme';
import AppContainer from './containers/AppContainer';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme[DEFAULT_THEME]}>
        <GlobalStyle />
        <BrowserRouter>
          <Route path='/' component={AppContainer} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
