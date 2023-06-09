import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  buildCalendar,
  buildYears,
  currentYearMonthDays,
  dateDetails,
  datesInRange,
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

type StartStopType = {
  startDate: Date;
  stopDate: Date;
  description: string;
};

type CalendarProps = {
  dates: StartStopType[];
};

function Calendar({ dates }: CalendarProps): JSX.Element {
  // current state of the calendar
  const [calendarMonth, setCalendarMonth] = useState<number>(month);
  const [calendarYear, setCalendarYear] = useState<number>(year);

  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const [selectedStopDate, setSelectedStopDate] = useState<string>('');
  const [dateSelectCount, setDateSelectCount] = useState<number>(0);

  const [weekdayRange, setWeekdayRange] = useState<string[]>([]);
  const [weekendRange, setWeekendRange] = useState<string[]>([]);

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

  const resetDateAndWeekendRangeState = (): void => {
    setWeekdayRange([]);
    setWeekendRange([]);
    setSelectedStartDate('');
    setSelectedStopDate('');
  };

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
    resetDateAndWeekendRangeState();
    const toDate = new Date(event.currentTarget.value);
    if (dateSelectCount === 0) {
      setSelectedStartDate(event.currentTarget.value);
      setDateSelectCount(dateSelectCount + 1);
    } else if (dateSelectCount === 1) {
      const startDate = new Date(selectedStartDate);
      setSelectedStopDate(event.currentTarget.value);
      // Fun little TS issue I was not aware of about sorting dates
      // checking the valueOf in the sort return argument fixes it
      // https://stackoverflow.com/a/60688789
      const orderDates = [startDate, toDate].sort(
        (a, b) => a.valueOf() - b.valueOf()
      );

      datesInRange(orderDates[0], orderDates[1]).forEach((date) => {
        if (isWeekend(date)) {
          setWeekendRange((prevState) => [
            ...prevState,
            date.toLocaleDateString(),
          ]);
        } else {
          setWeekdayRange((prevState) => [
            ...prevState,
            date.toLocaleDateString(),
          ]);
        }
      });
      setDateSelectCount(dateSelectCount + 1);
    } else {
      resetDateAndWeekendRangeState();
      setSelectedStartDate(event.currentTarget.value);
      setDateSelectCount(1);
    }
  };

  const handleOnYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setCalendarYear(parseInt(event.currentTarget.value, 10));
  };

  const handleOnMonthChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setCalendarMonth(parseInt(event.currentTarget.value, 10));
  };

  const calendar = buildCalendar(
    maxCalendarRange,
    calendarYearMonthDays.days,
    calendarPrevYearMonthDays.days,
    firstDayWeek
  );

  // break into a hook
  useEffect(() => {
    if (selectedStartDate && selectedStopDate) {
      resetDateAndWeekendRangeState();
      const orderDates = [
        new Date(selectedStartDate),
        new Date(selectedStopDate),
      ].sort((a, b) => a.valueOf() - b.valueOf());

      datesInRange(orderDates[0], orderDates[1]).forEach((date) => {
        if (isWeekend(date)) {
          setWeekendRange((prevState) => [
            ...prevState,
            date.toLocaleDateString(),
          ]);
        } else {
          setWeekdayRange((prevState) => [
            ...prevState,
            date.toLocaleDateString(),
          ]);
        }
      });
    }
  }, [selectedStartDate, selectedStopDate]);

  return (
    <div className="overflow-hidden p-4">
      <DateNav
        month={calendarMonth}
        monthDropdown={monthMap}
        onNextClick={handleNextState}
        onPrevClick={handlePrevState}
        onMonthChange={handleOnMonthChange}
        onYearChange={handleOnYearChange}
        year={calendarYear}
        yearDropdown={buildYears}
      />
      <div className="grid grid-cols-7 gap-4 text-center my-4">
        {Object.values(dayOfWeekMap).map((dayOf) => (
          <div key={uuidv4()} className="font-bold p-4">
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
                weekdayRange.includes(dateToLocaleDateString)
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
      <div className="mt-4 p-4 bg-white shadow-lg">
        {dates.map((date) => {
          return (
            <button
              key={uuidv4()}
              type="button"
              className="bg-blue-400 p-4 text-white rounded mr-4"
              onClick={() => {
                setSelectedStartDate(date.startDate.toLocaleDateString());
                setSelectedStopDate(date.stopDate.toLocaleDateString());
              }}
            >
              {date.description}
            </button>
          );
        })}
      </div>
      <div className="mt-4 p-4 bg-white shadow-lg overflow-x-scroll">
        <div>
          Weekday Start and Stop -{' '}
          {JSON.stringify([
            weekdayRange[0],
            weekdayRange[weekdayRange.length - 1],
          ])}
        </div>
        <div>WeekendRange - {JSON.stringify(weekendRange)}</div>
      </div>
    </div>
  );
}

export default Calendar;
