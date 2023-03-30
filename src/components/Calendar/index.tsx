import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  daysInMonth,
  dayOfWeekMap,
  maxCalendarRange,
  month,
  monthMap,
  year,
} from 'utils/date-functions';

import DateNav from './DateNav';

function Calendar() {
  // current state of the calendar
  const [calendarMonth, setCalendarMonth] = useState<number>(month);
  const [calendarYear, setCalendarYear] = useState<number>(year);
  const calendarDaysInMonth = daysInMonth(calendarYear, calendarMonth);

  const handlePrevState = (): void => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const handleNextState = (): void => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  return (
    <div className="overflow-hidden p-4">
      <DateNav
        month={monthMap[calendarMonth]}
        onNextClick={handleNextState}
        onPrevClick={handlePrevState}
        year={calendarYear}
      />
      <div className="grid grid-cols-7 gap-4 text-center my-4">
        {Object.values(dayOfWeekMap).map((dayOf) => (
          <div key={uuidv4()} className="font-bold">
            {dayOf}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4 bg-white rounded shadow-lg p-4">
        {[...Array(maxCalendarRange)].map((_, i) => {
          return <div key={uuidv4()}>{i}</div>;
        })}
      </div>
      Calendar Days in Month - {calendarDaysInMonth}
    </div>
  );
}

export default Calendar;
