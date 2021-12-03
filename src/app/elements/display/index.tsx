import React, { FC } from 'react';

import Style from './style.module.scss';

type Size = 'sm' | 'md' | 'lg' | 'xl';

type DisplayProps = {
  size: Size | Size[];
  className?: string;
}

export const Display: FC<DisplayProps> = ({
  size: sizeProp,
  children,
  className: classNameProp,
}) => {
  const className = typeof sizeProp === 'string' ? Style[sizeProp] : sizeProp.map(size => {
    return Style[size]
  }).join(' ');
  return <div className={`${classNameProp} ${className}`}>{children}</div>
}