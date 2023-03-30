export const month: number = new Date().getMonth();
export const year: number = new Date().getFullYear();
export const day: number = new Date().getDate();
export const calendarWeekRange = 6;
export const maxCalendarRange = 42;

export const daysInMonth = (yearArg: number, monthArg: number): number => {
  return new Date(yearArg, monthArg + 1, 0).getDate();
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
