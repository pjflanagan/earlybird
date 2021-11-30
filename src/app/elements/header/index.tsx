import React, { FC } from 'react';

import LogoMd from './header-md.png';
import LogoSm from './header-sm.png';

import Style from './style.module.scss';

type HeaderProps = {
  children?: JSX.Element;
  clear?: boolean;
}

export const Header: FC<HeaderProps> = ({
  children,
  clear
}) => {
  return (
    <div className={`${Style.header} ${clear ? Style.clear : ''}`}>
      <div className={Style.logoHolder}>
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
      <div className={Style.headerItemsHolder}>
        {children}
      </div>
    </div>
  );
}

export const HeaderItem: FC = () => {
  return (
    <div />
  );
}