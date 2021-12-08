import React, { FC, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import { Splash } from 'app/elements';
import { API } from 'app/utils';

import { MainComponent } from './MainComponent';

const AUTH_0_DOMAIN = process.env.REACT_APP_AUTH_0_DOMAIN || '';
const api = new API(AUTH_0_DOMAIN);

const LoginWrapperRaw: FC = () => {
  const {
    isLoading,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    const initApi = async () => {
      if (isAuthenticated && user && user.sub) {
        api.setAuth0UserSub(user.sub);
        const auth0AccessToken = await getAccessTokenSilently({});
        api.setAuth0AccessToken(auth0AccessToken);
      }
    }

    if (!isLoading && isAuthenticated) {
      initApi();
    }
  }, [isLoading]);

  return (
    <MainComponent api={api} />
  )
}

export default withAuthenticationRequired(LoginWrapperRaw, {
  onRedirecting: () => <Splash />,
});