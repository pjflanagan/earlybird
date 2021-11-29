import React, { FC, useState } from 'react';
import classNames from 'classnames';

import { Button, Calendar } from 'app/elements';

const TODAY = new Date();
const DEFAULT_DATE = new Date(TODAY.getTime() + 86400 * 1000);

type DateTimeToggleComponent = {
  date?: Date;
  setDate: (newDate: Date | undefined) => void;
}

// TODO: this is two parts
// it's a button that appears to expand into a datetime holder
// which on hover appears to expand into an absolute positioned calendar picker

const formatDate = (date: Date | undefined): string | undefined => {
  return date?.toLocaleString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
  });
}

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
      label={formatDate(date)}
      expandable
    >
      <Calendar
        selectedDay={date || new Date()}
        onChange={setDate}
      />
    </Button>
  );
};
