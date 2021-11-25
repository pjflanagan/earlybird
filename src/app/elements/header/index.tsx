import React, { FC } from 'react';
import { Grid } from 'antd';

import LogoMd from './header-md.png';
import LogoSm from './header-sm.png';

import Style from './style.module.less';

export const Header: FC = () => {
  // eslint-disable-next-line
  const screens = Grid.useBreakpoint();
  const screenMd = screens.lg;
  return (
    <div className={Style.header}>
      <img
        className={Style.logo}
        src={screenMd ? LogoMd : LogoSm}
        alt="Earlybird Logo"
      />
    </div>
  );
}