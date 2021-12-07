import { useState } from "react";

// on animation end might not work well here because
// we have different animations
export const useInvokedAnimation = (
  callback: () => void,
  duration: number,
): [
    boolean,
    () => void
  ] => {
  const [isAnimating, setIsAnimating] = useState(false);
  const invoke = () => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, duration);
  }
  return [isAnimating, invoke];
}
