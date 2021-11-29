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
  expandable?: boolean;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  disabled,
  icon,
  label,
  className: classNameProps,
  inactive,
  children,
  expandable
}) => {

  const className = classNames(Style.button, {
    [Style.disabled]: disabled,
    [`${classNameProps}`]: classNameProps,
    [Style.inactive]: inactive,
    [Style.labeledButton]: label,
    [Style.expandable]: expandable
  });

  return (
    <div
      className={className}
    >
      <div
        className={Style.iconHolder}
        onClick={onClick}
      >
        {getIcon(icon)}
      </div>
      {
        label && (
          <div
            className={Style.labelHolder}
            onClick={onClick}
          >
            {label}
          </div>
        )
      }
      {
        !!children &&
        <div className={Style.childrenHolder}>
          {children}
        </div>
      }
    </div>
  );
}
