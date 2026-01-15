import calendar from "./assets/images/calendar.png";

type Calendar = {
  onClick: () => void;
};

export function CalendarButton({ onClick }: Calendar) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-4 border-2 rounded-2xl w-50 p-3"
    >
      <img src={calendar} className="w-5"></img>Add Day
    </button>
  );
}
