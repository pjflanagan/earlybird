import React, { FC } from 'react';

import { Button, Calendar } from 'app/elements';

import Style from './style.module.scss';

const DEFAULT_DATE = new Date(new Date().getDate() + 1);

type DateTimeToggleComponent = {
  date?: Date;
  setDate: (newDate: Date | undefined) => void;
}

// TODO: this is two parts
// it's a button that appears to expand into a datetime holder
// which on hover appears to expand into an absolute positioned calendar picker

export const DateTimeToggleComponent: FC<DateTimeToggleComponent> = ({
  date,
  setDate
}) => {

  const toggleDate = () => {
    const newDate = date ? undefined : DEFAULT_DATE;
    setDate(newDate);
  }

  return (
    <Button
      icon="calendar"
      inactive={!date}
      onClick={toggleDate}
      label={date?.toLocaleString('en-US', {
        // weekday: 'short', // long, short, narrow
        day: 'numeric', // numeric, 2-digit
        year: 'numeric', // numeric, 2-digit
        month: 'short', // numeric, 2-digit, long, short, narrow
        hour: 'numeric', // numeric, 2-digit
        minute: 'numeric', // numeric, 2-digit
        // second: 'numeric', // numeric, 2-digit
      })}
    />
    // <div className={Style.dateTimeButtonExpanded}>
    //   <Calendar
    //     selectedDay={date || new Date()}
    //     onChange={setDate}
    //   />
    // </div>
  );
};
