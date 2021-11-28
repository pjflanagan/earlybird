import React, { FC } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'react-rainbow-components';

import { Header, Container } from 'app/elements';

export const PageLogin: FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Header />
      <Container>
        <Button
          onClick={() => loginWithRedirect()}
          label="Log in"
        />
      </Container>
    </>
  )
}
