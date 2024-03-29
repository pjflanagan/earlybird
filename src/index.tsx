/* eslint-disable */

import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";

import { PageMain, PageLogin } from 'app/pages';

import * as serviceWorker from './serviceWorker';
import './style.scss';


const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<PageMain />} />
          <Route path="login" element={<PageLogin />} />
        </Route>
      </Routes>
    </Router>
  );
}

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_0_DOMAIN!}
    clientId={process.env.REACT_APP_AUTH_0_CLIENT_ID!}
    redirectUri={window.location.origin}
    audience={`https://${process.env.REACT_APP_AUTH_0_DOMAIN}/api/v2/`}
    scope="read:current_user" // read:user_idp_tokens
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
