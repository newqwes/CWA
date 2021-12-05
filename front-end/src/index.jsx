import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';

import { DEFAULT_THEME } from './constants/theme';
import store from './store/configureStore';

import LoginSuccessContainer from './containers/LoginSuccessContainer';
import AppContainer from './containers/AppContainer';

import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme[DEFAULT_THEME]}>
        <GlobalStyle />
        <BrowserRouter>
          <Route exact path='/' component={AppContainer} />
          <Route exact path='/login/success' component={LoginSuccessContainer} />
          <Route exact path='/login/failure'>
            Ошибка авторизации
          </Route>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
