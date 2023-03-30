import buildClassList from 'utils/buildClassList';

export type DayBlockProps = {
  day: number;
  inactive?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
};

function DayBlock({ day, inactive = false, onClick, value }: DayBlockProps) {
  const classList = buildClassList('p-4', inactive && 'text-slate-300');
  return (
    <button type="button" className={classList} onClick={onClick} value={value}>
      {day}
    </button>
  );
}

export default DayBlock;
