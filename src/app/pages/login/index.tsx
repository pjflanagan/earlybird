import React, { FC } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import { Header, Container, Button, Background } from 'app/elements';

import Style from './style.module.scss';

export const PageLogin: FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const login = () => {
    if (isAuthenticated) {
      window.location.replace('/');
    } else {
      loginWithRedirect();
    }
  }

  return (
    <>
      <Header clear />
      <Container className={Style.container}>
        <div className={Style.promptHolder}>
          <div className={Style.title}>
            Tweet from whenever you want to!
          </div>
          <div className={Style.subTitle}>
            Earlybird helps manage your drafted and scheduled tweets.
          </div>
          <Button
            className={Style.button}
            onClick={login}
            icon="twitter"
            label="Log in with Twitter"
          />
        </div>
        <Background />
      </Container>
    </>
  )
}
