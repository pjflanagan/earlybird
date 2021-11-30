import React, { FC } from 'react';

import LogoMd from './header-md.png';
import LogoSm from './header-sm.png';

import Style from './style.module.scss';

type HeaderProps = {
  children?: JSX.Element;
  logoLargeColor?: 'purple' | 'white';
  headerBackgroundColor?: 'clear' | 'default';
}

export const Header: FC<HeaderProps> = ({
  children,
  logoLargeColor = 'purple',
  headerBackgroundColor = 'default'
}) => {
  return (
    <div className={`${Style.header} ${Style[headerBackgroundColor]}`}>
      <div className={Style.logoHolder}>
        <img
          className={`${Style.logo} ${Style.logoMd}`}
          src={LogoMd}
          alt="Earlybird Logo"
        />
        <img
          className={`${Style.logo} ${Style.logoSm} ${Style[logoLargeColor]}`}
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