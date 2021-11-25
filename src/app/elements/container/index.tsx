import React, { FC } from 'react';

import Style from './style.module.less';

export const Container: FC = ({
  children
}) => {
  return (
    <div className={Style.container}>
      {children}
    </div>
  );
}

export const ContainerLeft: FC = ({
  children
}) => {
  return (
    <div className={Style.containerLeft}>
      {children}
    </div>
  );
}

export const ContainerRight: FC = ({
  children
}) => {
  return (
    <div className={Style.containerRight}>
      {children}
    </div>
  );
}