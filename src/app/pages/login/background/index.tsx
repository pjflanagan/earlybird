import React, { FC, useEffect, useState } from 'react';

import Style from './style.module.scss';

const MAX_IMG_INDEX = 11;
const IMG_CYCLE_SPEED = 3 * 1000;

const getRandomImageIndex = () => Math.floor(Math.random() * (MAX_IMG_INDEX + 1));

const makeUrl = (imgIndex: number) => `${process.env.PUBLIC_URL}/img/bg/giphy-${imgIndex}.gif`;

export const Background: FC = () => {

  const [imgIndex, setImgIndex] = useState(getRandomImageIndex());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setImgIndex(getRandomImageIndex());
    }, IMG_CYCLE_SPEED);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <div
      className={Style.background}
      style={{
        background: `url(${makeUrl(imgIndex)})`
      }}
    />
  );
}
