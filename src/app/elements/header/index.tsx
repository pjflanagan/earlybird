import React, { FC } from 'react';

// import LogoMd from './header-md.png';
// import LogoSm from './header-sm.png';

import Style from './style.module.scss';

export const Header: FC = () => {
  return (
    <div className={Style.header}>
      <img
        className={Style.logo}
        // src={screenMd ? LogoMd : LogoSm}
        alt="Earlybird Logo"
      />
    </div>
  );
}