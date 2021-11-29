import React, { FC } from 'react';
import classNames from 'classnames';

import Style from './style.module.scss';

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  disabled
}) => {

  const className = classNames(Style.button, {
    [Style.disabled]: disabled
  });

  return (
    <div
      className={className}
      onClick={onClick}
    >
      {/* TODO: icon */}
    </div>
  )
}
