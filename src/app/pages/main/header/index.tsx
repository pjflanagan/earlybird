import React, { FC } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import { Display, Header, HeaderIcon, HeaderLink, Pill } from 'app/elements';
import { useDoubleClick } from 'app/hooks';

import Style from './style.module.scss';

export const HeaderComponent: FC = () => {
  const { user, logout } = useAuth0();

  const [clickCount, doubleClick] = useDoubleClick(
    () => logout({ returnTo: '/login' })
  );

  return (
    <Header>
      <HeaderLink>
        <Display size={['sm', 'md']}>
          <Pill
            className={Style.logoutPill}
            icon={clickCount === 0 ? 'user' : 'logout'}
            onClick={doubleClick}
            background="none"
            iconColor="white"
          />
        </Display>
        <Display size={['lg', 'xl']}>
          <Pill
            className={Style.logoutPill}
            icon={clickCount === 0 ? 'user' : 'logout'}
            onClick={doubleClick}
            label={clickCount === 0 ? `Logout ${user?.name}` : 'Confirm Logout'}
            hoverRevealLabel
            background="white"
          />
        </Display>
      </HeaderLink>
      {
        user && user.picture && <HeaderIcon src={user.picture} /> || <></>
      }
    </Header>
  )
}
