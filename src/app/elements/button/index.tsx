import React, { FC } from 'react';
import classNames from 'classnames';

import { getIcon } from '../icon';

import Style from './style.module.scss';

type ButtonIconProps = {
  icon: string;
  onClick: () => void;
  className?: string;
}

export const ButtonIcon: FC<ButtonIconProps> = ({
  onClick,
  icon,
  className
}) => {
  return (
    <div
      className={`${Style.iconHolder} ${className}`}
      onClick={onClick}
    >
      {getIcon(icon)}
    </div>
  );
};

type ButtonLabelProps = {
  onClick?: () => void;
  className?: string;
}

export const ButtonLabel: FC<ButtonLabelProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <div
      className={`${Style.labelHolder} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

type ButtonFrameProps = {
  className?: string;
  disabled?: boolean;
  secondary?: boolean;
}

export const ButtonFrame: FC<ButtonFrameProps> = ({
  children,
  className: classNameProp,
  disabled,
  secondary
}) => {
  const className = classNames(Style.button, {
    [Style.disabled]: disabled,
    [`${classNameProp}`]: classNameProp,
    [Style.secondary]: secondary
  });

  return (
    <div className={className}>
      {children}
    </div>
  )
}


type ButtonProps =
  ButtonFrameProps &
  ButtonLabelProps &
  ButtonIconProps & {
    label?: string;
  }

export const Button: FC<ButtonProps> = ({
  onClick,
  disabled,
  icon,
  label,
  className: classNameProp,
  secondary
}) => {

  const className = classNames(Style.button, {
    [`${classNameProp}`]: classNameProp,
  });

  return (
    <ButtonFrame
      disabled={disabled}
      className={className}
      secondary={secondary}
    >
      <ButtonIcon icon={icon} onClick={onClick} />
      {
        label && <ButtonLabel onClick={onClick}>{label}</ButtonLabel>
      }
    </ButtonFrame>
  );
}
