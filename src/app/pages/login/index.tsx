import React, { FC } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import { Header, Container } from 'app/elements';

export const PageLogin: FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Header />
      <Container>
        <button
          onClick={() => loginWithRedirect()}
        >Log in</button>
      </Container>
    </>
  )
}
