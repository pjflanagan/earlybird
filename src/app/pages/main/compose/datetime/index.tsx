import React, { FC } from 'react';

import { Calendar } from 'app/elements';

import Style from './style.module.scss';

type DateTimeToggleComponent = {
  date?: Date;
  setDate: (newDate: Date) => void;
}

// TODO: this is two parts
// it's a button that appears to expand into a datetime holder
// which on hover appears to expand into an absolute positioned calendar picker

export const DateTimeToggleComponent: FC<DateTimeToggleComponent> = ({
  date,
  setDate
}) => {
  return (
    <div className={Style.dateTimeButtonExpanded}>
      <Calendar
        selectedDay={date || new Date()}
        onChange={setDate}
      />
    </div>
  );
};
