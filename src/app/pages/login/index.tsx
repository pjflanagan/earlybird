import React, { FC } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import { Header, Container, Button } from 'app/elements';

import { Background } from './background';

import Style from './style.module.scss';

export const PageLogin: FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Header />
      <Container className={Style.container}>
        <div className={Style.promptHolder}>
          <span className={Style.title}>
            Tweet from whenever you want to!
          </span>
          <Button
            className={Style.button}
            onClick={() => loginWithRedirect()}
            icon="twitter"
            label="Log in with Twitter"
          />
        </div>
        <Background />
      </Container>
    </>
  )
}
