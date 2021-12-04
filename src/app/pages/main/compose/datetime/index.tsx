import React, { FC } from 'react';
import classNames from 'classnames';

import { ButtonFrame, ButtonIcon, ButtonLabel } from 'app/elements'; // Calendar

import Style from './style.module.scss';

const padNumber = (n: number) => `${n}`.padStart(2, '0');

// yyyy-MM-ddThh:mm
const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const MM = padNumber(date.getMonth() + 1);
  const dd = padNumber(date.getDay());
  const hh = padNumber(date.getHours());
  const mm = padNumber(date.getMinutes());
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
}

// const getReadableDate = (date: Date | undefined): string => {
//   if (!date) {
//     return '';
//   }
//   return date.toLocaleString('en-US', {
//     day: 'numeric',
//     year: 'numeric',
//     month: 'short',
//     hour: 'numeric',
//     minute: 'numeric',
//   });
// }

// this could be two parts
// a button that appears to expand into a datetime holder (but really is a separate absolute element)
// which on hover appears to expand into an absolute positioned calendar picker

type DateTimeToggleComponent = {
  date?: Date;
  setDate: (newDate: Date | undefined) => void;
}


export const DateTimeToggleComponent: FC<DateTimeToggleComponent> = ({
  date,
  setDate
}) => {

  const DEFAULT_DATE = new Date(new Date().getTime() + 86400 * 1000);

  const toggleDate = () => {
    const newDate = date ? undefined : DEFAULT_DATE;
    setDate(newDate);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setDate(new Date(e.target.value));
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
        <input
          type="datetime-local"
          value={formatDate(date ? date : DEFAULT_DATE)}
          onChange={handleChange}
          min={formatDate(new Date())}
        />
        {/* {} */}
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
