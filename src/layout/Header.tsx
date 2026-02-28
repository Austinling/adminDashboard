import rongLogo from "../assets/images/rongbg.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type HeaderProps = {
  headerShow: () => void;
};

export function Header({ headerShow }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="h-20 w-full bg-red-300 border-b-2 border-b-white z-50 sticky top-0 flex justify-start items-center gap-3">
      <button
        className="ml-4 transition-all duration-300 ease-in-out transform flex items-center justify-center"
        style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        onClick={() => {
          headerShow();
          setOpen(!isOpen);
        }}
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <Menu className="w-8 h-8 text-white" />
        )}
      </button>

      <img src={rongLogo} alt="Logo" className="w-20 p-3 ml-5"></img>
      <div className="text-white text-1xl lg:text-2xl diphylleia-regular ">
        {t("Admin_Panel")}
      </div>
      <div className="flex flex-1"></div>
      <div className="mr-6 bg-white rounded-2xl p-3">
        <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="ch">中文</option>
        </select>
      </div>
    </div>
  );
}
