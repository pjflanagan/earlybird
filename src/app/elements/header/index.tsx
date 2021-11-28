import React, { FC } from 'react';

import LogoMd from './header-md.png';
import LogoSm from './header-sm.png';

import Style from './style.module.scss';

export const Header: FC = () => {
  return (
    <div className={Style.header}>
      <img
        className={`${Style.logo} ${Style.logoMd}`}
        src={LogoMd}
        alt="Earlybird Logo"
      />
      <img
        className={`${Style.logo} ${Style.logoSm}`}
        src={LogoSm}
        alt="Earlybird Logo"
      />
    </div>
  );
}