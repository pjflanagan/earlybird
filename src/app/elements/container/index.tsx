import React, { FC } from 'react';
import classNames from 'classnames';

import Style from './style.module.scss';

type ContainerProps = {
  className?: string;
}

export const Container: FC<ContainerProps> = ({
  children,
  className: classNameProp
}) => {
  const className = classNames(Style.container, {
    [`${classNameProp}`]: classNameProp
  })
  return (
    <div className={className}>
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