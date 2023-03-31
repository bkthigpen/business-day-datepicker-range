type PrevMonthAndYearType = {
  month: number; // keep in mind this is 0 indexed
  year: number;
  days: number;
};

type DateDetailsType = {
  date: Date;
  isCurrentMonth: boolean;
  isWeekend: boolean;
};

export const month: number = new Date().getMonth();
export const year: number = new Date().getFullYear();
export const day: number = new Date().getDate();
export const calendarWeekRange = 6;
export const maxCalendarRange = 42;

export const daysInMonth = (yearArg: number, monthArg: number): number => {
  return new Date(yearArg, monthArg + 1, 0).getDate();
};

export const prevYearMonthDays = (
  yearArg: number,
  monthArg: number
): PrevMonthAndYearType => {
  if (monthArg === 0) {
    return {
      days: daysInMonth(yearArg - 1, 11),
      month: 11,
      year: yearArg - 1,
    };
  }

  return {
    days: daysInMonth(yearArg, monthArg - 1),
    month: monthArg - 1,
    year: yearArg,
  };
};

export const nextYearMonthDays = (
  yearArg: number,
  monthArg: number
): PrevMonthAndYearType => {
  if (monthArg === 11) {
    return {
      days: daysInMonth(yearArg + 1, 0),
      month: 0,
      year: yearArg + 1,
    };
  }

  return {
    days: daysInMonth(yearArg, monthArg + 1),
    month: monthArg + 1,
    year: yearArg,
  };
};

export const currentYearMonthDays = (
  yearArg: number,
  monthArg: number
): PrevMonthAndYearType => ({
  days: daysInMonth(yearArg, monthArg),
  month: monthArg,
  year: yearArg,
});

// this returns the current week (Sun-Sat) 0 indexed (0-6)
export const firstDayOfTheWeek = (
  yearArg: number,
  monthArg: number
): number => {
  return new Date(yearArg, monthArg, 1).getDay();
};

export const isWeekend = (date: Date): boolean => {
  const dayOfWeek = date.getDay();

  return dayOfWeek % 6 === 0;
};

export const buildCalendar = (
  rangeArg: number,
  currentDaysArg: number,
  prevDaysArg: number,
  dayArg: number
): number[] => {
  const array: number[] = [];
  let currentDaysCount = 1;
  let prevMonthCount = prevDaysArg;
  let nextMontCount = 1;

  for (let i = 0; i < rangeArg; i += 1) {
    if (dayArg > i) {
      array.unshift(prevMonthCount);
      prevMonthCount -= 1;
    } else if (i >= currentDaysArg + dayArg) {
      array.push(nextMontCount);
      nextMontCount += 1;
    } else {
      array.push(currentDaysCount);
      currentDaysCount += 1;
    }
  }

  return array;
};

export const dateDetails = (
  prevObj: PrevMonthAndYearType,
  currObj: PrevMonthAndYearType,
  nextObj: PrevMonthAndYearType,
  count: number,
  index: number,
  firstDayWeek: number
): DateDetailsType => {
  if (index < firstDayWeek) {
    const dateObject = new Date(prevObj.year, prevObj.month, count);
    return {
      date: dateObject,
      isCurrentMonth: false,
      isWeekend: isWeekend(dateObject),
    };
  }

  if (index >= currObj.days + firstDayWeek) {
    const dateObject = new Date(nextObj.year, nextObj.month, count);
    // console.log('dateObject', dateObject);
    return {
      date: dateObject,
      isCurrentMonth: false,
      isWeekend: isWeekend(dateObject),
    };
  }

  const dateObject = new Date(currObj.year, currObj.month, count);
  return {
    date: dateObject,
    isCurrentMonth: true,
    isWeekend: isWeekend(dateObject),
  };
};

export const datesInRange = (startDate: Date, endDate: Date): Date[] => {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const monthMap: { [type: number]: string } = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
} as const;

export const dayOfWeekMap = {
  Sunday: 'S',
  Monday: 'M',
  Tuesday: 'T',
  Wednesday: 'W',
  Thursday: 'T',
  Friday: 'F',
  Saturday: 'S',
} as const;

export const buildYears = [...Array(200).keys()].map((yearArg) => {
  return yearArg + 1900;
});
