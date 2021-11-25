import React, { FC, useEffect } from "react"

const Page404: FC = () => {
  useEffect(() => {
    window.location.replace('/login');
  });
  return null;
};

export { Page404 };
