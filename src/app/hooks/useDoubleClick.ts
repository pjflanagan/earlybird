
import { useState, useEffect } from 'react';

type DoubleClickType = [number, () => void];

export const useDoubleClick = (
  callback: () => void,
): DoubleClickType => {
  const [clickCount, setClickCount] = useState(0);
  let timeOut: NodeJS.Timeout;

  useEffect(() => {
    return function cleanup() {
      clearTimeout(timeOut);
    };
  });

  useEffect(() => {
    if (clickCount === 1) {
      timeOut = setTimeout(() => {
        setClickCount(0);
      }, 2000);
      return;
    }
  }, [clickCount]);

  const doubleClick = () => {
    if (clickCount === 0) {
      setClickCount(1);
      return;
    }
    callback();
    clearTimeout(timeOut);
    setClickCount(0);
  }

  return [clickCount, doubleClick];
}
