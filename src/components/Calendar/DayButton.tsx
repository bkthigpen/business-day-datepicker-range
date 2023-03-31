import buildClassList from 'utils/buildClassList';

export type DayBlockProps = {
  active: boolean;
  day: number;
  disabled?: boolean;
  inactive?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
};

function DayBlock({
  active = false,
  day,
  disabled = false,
  inactive = false,
  onClick,
  value,
}: DayBlockProps) {
  const classList = buildClassList(
    'p-4 rounded',
    inactive && 'text-slate-300',
    active && 'bg-blue-400 text-white',
    disabled && 'text-red-300'
  );
  return (
    <button
      type="button"
      className={classList}
      disabled={disabled}
      onClick={onClick}
      value={value}
    >
      {day}
    </button>
  );
}

export default DayBlock;
