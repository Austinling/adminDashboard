type MonthOrDayProp = {
  mode: string;
  setMode: (mode: string) => void;
};

export function MonthOrDayDropDown({ mode, setMode }: MonthOrDayProp) {
  return (
    <select value={mode} onChange={(e) => setMode(e.target.value)}>
      <option value="Month">Month</option>
      <option value="Day">Day</option>
    </select>
  );
}
