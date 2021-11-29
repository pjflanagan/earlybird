import React, { FC } from 'react';
import classNames from 'classnames';

import { getIcon } from '../icon';

import Style from './style.module.scss';

type ButtonProps = {
  icon: string;
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
  inactive?: boolean;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  disabled,
  icon,
  label,
  className: classNameProps,
  inactive
}) => {

  const className = classNames(Style.button, {
    [Style.disabled]: disabled,
    [`${classNameProps}`]: classNameProps,
    [Style.inactive]: inactive,
    [Style.labeledButton]: label,
  });

  return (
    <div
      className={className}
      onClick={onClick}
    >
      <div className={Style.iconHolder}>
        {getIcon(icon)}
      </div>
      {
        label && (
          <div className={Style.labelHolder}>
            {label}
          </div>
        )
      }
    </div>
  );
}
