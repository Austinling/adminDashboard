type PaymentDropDownProp = {
  mode: string;
  setMode: (mode: string) => void;
};

import { useTranslation } from "react-i18next";

export function PaymentLineDropDown({ mode, setMode }: PaymentDropDownProp) {
  const { t } = useTranslation();
  return (
    <select value={mode} onChange={(e) => setMode(e.target.value)}>
      <option value="Tuition_Fee">{t("Tuition_Fee")}</option>
      <option value="Number_Of_Payments">{t("Number_Of_Payments")}</option>
    </select>
  );
}
