
export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const SHORT_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const ONE_DAY = 60 * 60 * 24 * 1000;
export const TODAY_TIMESTAMP = Date.now() - (Date.now() % ONE_DAY) + (new Date().getTimezoneOffset() * 1000 * 60);

export const getMonthStr = (month: number): string => MONTHS[Math.max(Math.min(11, month), 0)] || 'Month';

export const getNumberOfDays = (year: number, month: number): number => {
  return 40 - new Date(year, month, 40).getDate();
}

export type DayDetails = {
  date: number;
  day: number;
  month: number;
  timestamp: number;
  dayString: string;
}

const getDayDetails = (
  index: number,
  numberOfDays: number,
  firstDay: number,
  year: number,
  month: number
): DayDetails => {
  const date = index - firstDay;
  const day = index % 7;
  let prevMonth = month - 1;
  let prevYear = year;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }
  const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
  const rvDate = (date < 0 ? prevMonthNumberOfDays + date : date % numberOfDays) + 1;
  const rvMonth = date < 0 ? -1 : date >= numberOfDays ? 1 : 0;
  const timestamp = new Date(year, month, rvDate).getTime();
  return {
    date: rvDate,
    day,
    month: rvMonth,
    timestamp,
    dayString: DAYS[day]
  }
}

export type MonthDetails = DayDetails[];

export const getMonthDetails = (year: number, month: number): MonthDetails => {
  const firstDay = (new Date(year, month)).getDay();
  const numberOfDays = getNumberOfDays(year, month);
  const monthArray = [];
  const rows = 6;
  let currentDay = null;
  let index = 0;
  const cols = 7;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      currentDay = getDayDetails(
        index,
        numberOfDays,
        firstDay,
        year,
        month
      );
      monthArray.push(currentDay);
      index++;
    }
  }

  return monthArray;
}

export const isCurrentDay = (day: DayDetails): boolean => {
  return day.timestamp === TODAY_TIMESTAMP;
}
