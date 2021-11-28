import React, { FC } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import { Header, Container } from 'app/elements';

import { Background } from './background';

import Style from './style.module.scss';

export const PageLogin: FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Header />
      <Container className={Style.container}>
        <div className={Style.promptHolder}>
          Tweet from whenever you want to!
          <div
            className={Style.button}
            onClick={() => loginWithRedirect()}
          >
            Log in with Twitter
          </div>
        </div>
        <Background />
      </Container>
    </>
  )
}
