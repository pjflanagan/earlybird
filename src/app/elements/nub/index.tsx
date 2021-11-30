import React, { FC } from 'react';

import { getIcon } from '../icon';

import Style from './style.module.scss';

type NubProps = {
  icon: string;
  onClick: () => void;
  className?: string;
}

export const Nub: FC<NubProps> = ({
  icon,
  onClick,
  className: classNameProp
}) => {
  return (
    <div className={`${Style.nub} ${classNameProp}`} onClick={onClick}>
      {getIcon(icon)}
    </div>
  )
}