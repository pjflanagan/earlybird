/* eslint-disable */

import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Application } from 'react-rainbow-components';
import { Auth0Provider } from "@auth0/auth0-react";

// eslint-ignore
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';

import { PageMain, PageLogin } from 'app/pages';

import * as serviceWorker from './serviceWorker';
import './style.scss';

// const { REACT_APP_ENV } = process.env;
// const composeEnhancers = (REACT_APP_ENV === 'PRD') ? compose : composeWithDevTools;

const theme = {
  rainbow: {
    palette: {
      brand: '#562fd8',
      mainBackground: '#ecedff',
      background: '#ecedff',
    },
  },
};

const App: FC = () => {

  // useEffect =>
  // store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

  return (
    <Application theme={theme}>
      <Router>
        {/* TODO: we probably will use redux here because managing an array of tweets might need it */}
        {/* <Provider store={store}>  */}
        <Routes>
          <Route path="/login" element={<PageLogin />} />
          <Route path={"/"} element={<PageMain />} />
        </Routes>
        {/* </Provider> */}
      </Router>
    </Application>
  );
}

console.log(process.env);

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_0_DOMAIN || ''}
    clientId={process.env.REACT_APP_AUTH_0_CLIENT_ID || ''}
    redirectUri={window.location.origin}
  >
    <App />,
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unRegister();
