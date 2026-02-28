type MonthOrDayProp = {
  mode: string;
  setMode: (mode: string) => void;
};

import { useTranslation } from "react-i18next";

export function MonthOrDayDropDown({ mode, setMode }: MonthOrDayProp) {
  const { t } = useTranslation();

  return (
    <select value={mode} onChange={(e) => setMode(e.target.value)}>
      <option value="Month">{t("Month")}</option>
      <option value="Day">{t("Day")}</option>
    </select>
  );
}
