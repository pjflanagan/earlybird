import React, { FC } from 'react';
import classNames from 'classnames';

import { getIcon } from '../icon';

import Style from './style.module.scss';

// TODO: simplify this, move a lot of the logic to a specific calendar input

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
}

export const ButtonLabel: FC<ButtonLabelProps> = ({
  children,
  onClick
}) => {
  return (
    <div
      className={Style.labelHolder}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

type ButtonFrameProps = {
  className?: string;
  disabled?: boolean;
}

export const ButtonFrame: FC<ButtonFrameProps> = ({
  children,
  className: classNameProp,
  disabled
}) => {
  const className = classNames(Style.button, {
    [Style.disabled]: disabled,
    [`${classNameProp}`]: classNameProp,
  });

  return (
    <div className={className}>
      {children}
    </div>
  )
}


type ButtonProps = {
  icon: string;
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  disabled,
  icon,
  label,
  className: classNameProp,
}) => {

  const className = classNames(Style.button, {
    [`${classNameProp}`]: classNameProp,
    [Style.labeledButton]: label,
  });

  return (
    <ButtonFrame
      disabled={disabled}
      className={className}
    >
      <ButtonIcon icon={icon} onClick={onClick} />
      {
        label && <ButtonLabel onClick={onClick}>{label}</ButtonLabel>
      }
    </ButtonFrame>
  );
}
