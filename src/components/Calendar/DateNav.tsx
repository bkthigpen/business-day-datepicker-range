import { v4 as uuidv4 } from 'uuid';

export type DateNavProps = {
  month: number;
  monthDropdown: { [type: number]: string };
  yearDropdown: number[];
  onPrevClick: () => void;
  onNextClick: () => void;
  onMonthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onYearChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  year: number;
};

function DateNav({
  month,
  monthDropdown,
  yearDropdown,
  onPrevClick,
  onNextClick,
  onMonthChange,
  onYearChange,
  year,
}: DateNavProps): JSX.Element {
  return (
    <div className="flex align-center justify-between font-bold">
      <button
        type="button"
        className="text-3xl align-center text-gray-400 hover:text-black"
        onClick={onPrevClick}
      >
        {'<'}
      </button>
      <div className="text-xl">
        <select value={month} onChange={onMonthChange}>
          {Object.entries(monthDropdown).map(([key, value]) => {
            return (
              <option key={uuidv4()} value={key}>
                {value}
              </option>
            );
          })}
        </select>
        <select value={year} onChange={onYearChange}>
          {yearDropdown.map((yearDrop) => {
            return (
              <option key={uuidv4()} value={yearDrop}>
                {yearDrop}
              </option>
            );
          })}
        </select>
      </div>
      <button
        type="button"
        className="text-3xl align-center text-gray-400 hover:text-black"
        onClick={onNextClick}
      >
        {'>'}
      </button>
    </div>
  );
}

export default DateNav;
