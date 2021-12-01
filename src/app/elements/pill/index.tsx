import React, { FC } from 'react';
import classNames from 'classnames';

import { getIcon } from '../icon';

import Style from './style.module.scss';

type PillProps = {
  icon?: string;
  onClick?: () => void;
  className?: string;
  label?: string;
  background?: 'purple' | 'grey' | 'none';
  iconColor?: 'purple';
}

export const Pill: FC<PillProps> = ({
  icon,
  onClick,
  className: classNameProp,
  label,
  background,
  iconColor
}) => {

  const className = classNames(Style.pill, {
    [`${classNameProp}`]: classNameProp,
    [Style[`${background}`]]: background,
    [Style.hoverable]: onClick,
    [Style[`iconColor-${iconColor}`]]: iconColor
  });

  return (
    <div className={className} onClick={onClick}>
      {
        icon && <div className={Style.iconHolder}>{getIcon(icon)}</div>
      }
      {
        label && <div className={Style.labelHolder}>{label}</div>
      }
    </div>
  )
}