import Calendar from 'components/Calendar';

const predefinedDateRanges = [
  {
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    stopDate: new Date(),
    description: 'Last 7 Days',
  },
  {
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    stopDate: new Date(),
    description: 'Last 30 Days',
  },
  {
    startDate: new Date(),
    stopDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    description: 'Next 7 Days',
  },
];

function App(): JSX.Element {
  return (
    <div className="h-screen bg-slate-50">
      <div className="container= mx-auto px-4">
        <Calendar dates={predefinedDateRanges} />
      </div>
    </div>
  );
}

export default App;
