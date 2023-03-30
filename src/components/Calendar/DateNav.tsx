type DateNavProps = {
  month: string;
  onPrevClick: () => void;
  onNextClick: () => void;
  year: number;
};

function DateNav({
  month,
  onPrevClick,
  onNextClick,
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
        {month} {year}
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
