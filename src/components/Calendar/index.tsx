import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  buildCalendar,
  currentYearMonthDays,
  dateDetails,
  datesInRange,
  dayOfWeekMap,
  firstDayOfTheWeek,
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

  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const [dateSelectCount, setDateSelectCount] = useState<number>(0);
  const [selectedDateRange, setSelectedDateRange] = useState<string[]>([]);

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

  const handleDayButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const toDate = new Date(event.currentTarget.value);
    if (dateSelectCount === 0) {
      setSelectedStartDate(event.currentTarget.value);
      setDateSelectCount(dateSelectCount + 1);
    } else if (dateSelectCount === 1) {
      const startDate = new Date(selectedStartDate);

      // Fun little TS issue I was not aware of about sorting dates
      // checking the valueOf in the sort return argument fixes it
      // https://stackoverflow.com/a/60688789
      const orderDates = [startDate, toDate].sort(
        (a, b) => a.valueOf() - b.valueOf()
      );

      const dateRanges = datesInRange(orderDates[0], orderDates[1]).map(
        (date) => date.toLocaleDateString()
      );
      setDateSelectCount(dateSelectCount + 1);
      setSelectedDateRange(dateRanges);
    } else {
      setSelectedStartDate(event.currentTarget.value);
      setSelectedDateRange([]);
      setDateSelectCount(1);
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
          const {
            date,
            isCurrentMonth,
            isWeekend: isWeekendVar,
          } = dateDetails(
            calendarPrevYearMonthDays,
            calendarYearMonthDays,
            calendarNextYearMonthDays,
            cal,
            i,
            firstDayWeek
          );

          const dateToLocaleDateString = date.toLocaleDateString();

          return (
            <DayButton
              key={uuidv4()}
              active={
                dateToLocaleDateString === selectedStartDate ||
                selectedDateRange.includes(dateToLocaleDateString)
              }
              day={cal}
              disabled={isWeekendVar}
              inactive={!isCurrentMonth}
              onClick={handleDayButtonClick}
              value={dateToLocaleDateString}
            />
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
      {/* Selected Dates - {selectedDates} */}
      {/* selectedStartDate - {selectedStartDate}
      <br />
      selectedEndDate - {selectedEndDate}
      <br />
      dateSelectCount - {dateSelectCount} */}
    </div>
  );
}

export default Calendar;
