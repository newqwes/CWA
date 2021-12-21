import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';

import { DEFAULT_THEME } from './constants/theme';
import store from './store/configureStore';

import AppContainer from './containers/AppContainer';
import CloseWindow from './components/CloseWindow';

import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme[DEFAULT_THEME]}>
        <GlobalStyle />
        <BrowserRouter>
          <Route path='/' component={AppContainer} />
          <Route path={['/login/success', '/login/failure']} component={CloseWindow} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
