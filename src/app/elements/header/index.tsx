import React, { FC } from 'react';

import LogoMd from './header-md.png';
import LogoSm from './header-sm.png';

import Style from './style.module.scss';

type HeaderProps = {
  children?: JSX.Element | JSX.Element[];
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

type HeaderIconProps = {
  src: string;
}

export const HeaderIcon: FC<HeaderIconProps> = ({
  src,
}) => {
  return (
    <img className={Style.headerIcon} src={src} alt="Profile Photo" />
  );
}

type HeaderLinkProps = {
  onClick: () => void;
}

export const HeaderLink: FC<HeaderLinkProps> = ({
  onClick
}) => {
  return (
    <div onClick={onClick}></div>
  );
}