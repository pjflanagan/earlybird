import React, { FC } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'antd';
import { TwitterOutlined } from '@ant-design/icons';


import { Header, Container } from 'app/elements';

export const PageLogin: FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Header />
      <Container>
        <Button
          onClick={() => loginWithRedirect()}
          type="primary"
          size="large"
          icon={<TwitterOutlined />}
          
        >
          Log In
        </Button>
      </Container>
    </>
  )
}
