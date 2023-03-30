import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  buildCalendar,
  checkIfWeekend,
  currentYearMonthDays,
  // daysInMonth,
  dayOfWeekMap,
  firstDayOfTheWeek,
  isWeekend,
  maxCalendarRange,
  month,
  monthMap,
  nextYearMonthDays,
  prevYearMonthDays,
  year,
} from 'utils/date-functions';

import DayButton from './DayButton';
import DateNav from './DateNav';

function Calendar() {
  // current state of the calendar
  const [calendarMonth, setCalendarMonth] = useState<number>(month);
  const [calendarYear, setCalendarYear] = useState<number>(year);

  const calendarYearMonthDays = currentYearMonthDays(
    calendarYear,
    calendarMonth
  );
  const calendarPrevYearMonthDays = prevYearMonthDays(
    calendarYear,
    calendarMonth
  );
  const calendarNextYearMonthDays = nextYearMonthDays(
    calendarYear,
    calendarMonth
  );

  const firstDayWeek = firstDayOfTheWeek(calendarYear, calendarMonth);

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

  const calendar = buildCalendar(
    maxCalendarRange,
    calendarYearMonthDays.days,
    calendarPrevYearMonthDays.days,
    firstDayWeek
  );

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
        {calendar.map((cal, i) => {
          const currentlyWeekend = checkIfWeekend(
            calendarPrevYearMonthDays,
            calendarYearMonthDays,
            calendarNextYearMonthDays,
            cal,
            i,
            firstDayWeek
          );
          return (
            <DayButton key={uuidv4()} day={cal} disabled={currentlyWeekend} />
          );
        })}
      </div>
      {/* calendarYearMonthDays - {JSON.stringify(calendarYearMonthDays)}
      <br />
      calendarPrevYearMonthDays - {JSON.stringify(calendarPrevYearMonthDays)}
      <br />
      calendarNextYearMonthDays - {JSON.stringify(calendarNextYearMonthDays)}
      <br />
      firstDayWeek - {firstDayWeek} */}
    </div>
  );
}

export default Calendar;
