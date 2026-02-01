type StudentPieChartDropDownProp = {
  mode: string;
  setMode: (mode: string) => void;
};

export function StudentPieChartDropDown({
  mode,
  setMode,
}: StudentPieChartDropDownProp) {
  return (
    <select value={mode} onChange={(e) => setMode(e.target.value)}>
      <option value="Grade">Grade</option>
      <option value="Time Period">Time Period</option>
      <option value="Class Date">Class Date</option>
    </select>
  );
}
