import filter from "./assets/images/filter.png";
import { useTranslation } from "react-i18next";

type PaymentButtonProp = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function PaymentFilterButton({ open, setOpen }: PaymentButtonProp) {
  const { t } = useTranslation();
  return (
    <div className="relative w-30 flex items-center justify-center border-2 border-gray-400 ml-5 rounded-4xl">
      <button
        className="w-30 flex justify-center items-center text-gray-500 cursor-pointer relative z-10"
        onClick={() => setOpen(!open)}
      >
        {t("Filter")}
        <img src={filter} alt="filter" className="w-5 ml-4"></img>
      </button>
    </div>
  );
}
