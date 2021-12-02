import React, { FC } from 'react';
import classNames from 'classnames';

import { ButtonFrame, ButtonIcon, ButtonLabel } from 'app/elements'; // Calendar

import Style from './style.module.scss';

const TODAY = new Date();
const DEFAULT_DATE = new Date(TODAY.getTime() + 86400 * 1000);

type DateTimeToggleComponent = {
  date?: Date;
  setDate: (newDate: Date | undefined) => void;
}

// this could be two parts
// a button that appears to expand into a datetime holder (but really is a separate absolute element)
// which on hover appears to expand into an absolute positioned calendar picker

// const formatDate = (date: Date | undefined): string | undefined => {
//   return date?.toLocaleString('en-US', {
//     day: 'numeric',
//     year: 'numeric',
//     month: 'short',
//     hour: 'numeric',
//     minute: 'numeric',
//   });
// }

export const DateTimeToggleComponent: FC<DateTimeToggleComponent> = ({
  date,
  setDate
}) => {

  const toggleDate = () => {
    const newDate = date ? undefined : DEFAULT_DATE;
    setDate(newDate);
  }

  const className = classNames(Style.calendarButton, {
    [Style.inactive]: !date,
  });

  return (
    <ButtonFrame
      className={className}
    >
      <ButtonIcon className={Style.iconHolder} icon="calendar" onClick={toggleDate} />
      <ButtonLabel className={Style.labelHolder}>
        <input type="datetime-local" value={date?.toDateString()} />
        {/* {formatDate(date)} */}
      </ButtonLabel>
      {/* <div className={Style.calendarHolder}>
        <Calendar
          selectedDay={date || new Date()}
          onChange={setDate}
        />
      </div> */}
    </ButtonFrame>
  );
};
