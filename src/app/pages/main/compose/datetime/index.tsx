import React, { FC } from 'react';

import Style from './style.module.scss';

type DateTimeToggleComponent = {
  date?: Date;
  setDate: (newDate: Date) => void;
}

export const DateTimeToggleComponent: FC<DateTimeToggleComponent> = ({
  date,
  setDate
}) => {
  return (
    <div />
    // <DateTimePicker
    //   className={Style.dateTimePicker}
    //   value={date}
    //   onChange={setDate}
    // />
  );
};
