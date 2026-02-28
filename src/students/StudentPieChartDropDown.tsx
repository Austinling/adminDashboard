type StudentPieChartDropDownProp = {
  mode: string;
  setMode: (mode: string) => void;
};

import { useTranslation } from "react-i18next";

export function StudentPieChartDropDown({
  mode,
  setMode,
}: StudentPieChartDropDownProp) {
  const { t } = useTranslation();
  return (
    <select value={mode} onChange={(e) => setMode(e.target.value)}>
      <option value="Grade">{t("Grade")}</option>
      <option value="Time Period">{t("Time_Period")}</option>
      <option value="Class Date">{t("Class_Date")}</option>
    </select>
  );
}
