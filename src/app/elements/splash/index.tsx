import React, { FC } from "react";
import classNames from "classnames";

import * as Style from './style.module.scss';

type SplashProps = {
  isOpen: boolean;
}

export const Splash: FC<SplashProps> = ({
  isOpen
}) => {

  const className = classNames(Style.splash, {
    [Style.closed]: !isOpen
  })

  return (
    <div className={className}>
      {/* TODO: loading animation is bird clock spinning arms */}
    </div>
  );
}