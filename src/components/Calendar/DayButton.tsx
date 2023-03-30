import buildClassList from 'utils/buildClassList';

export type DayBlockProps = {
  day: number;
  disabled?: boolean;
  inactive?: boolean;
};

function DayBlock({ day, disabled = false, inactive = false }: DayBlockProps) {
  const classList = buildClassList(
    'text-center p-4 bg-red-500',
    inactive && 'bg-blue-500',
    disabled && 'bg-gray-400'
  );
  return (
    <button type="button" className={classList} disabled={disabled}>
      {day}
    </button>
  );
}

export default DayBlock;
