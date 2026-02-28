import { UsersRound, WalletCards, GraduationCap, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Navbar = {
  onClick: () => void;
  navBarShow: boolean;
};

export function Navbar({ onClick, navBarShow }: Navbar) {
  if (!navBarShow) {
    return null;
  }

  const { t } = useTranslation();

  return (
    <div className="bg-red-300 w-50 flex shadow-lg flex-col gap-6 mr-10">
      <div className="flex flex-1 flex-col w-50 justify-center gap-5">
        <Link
          to="/dashboard"
          className=" h-10 items-center group hover:bg-white justify-center flex"
        >
          <div className="w-12 flex justify-center">
            <GraduationCap className="w-8 h-8 text-white group-hover:text-red-300" />
          </div>
          <div className="text-white diphylleia-regular text-1xl group-hover:text-red-300">
            {t("Dashboard")}
          </div>
        </Link>
        <Link
          to="/students"
          className=" flex h-10 items-center group hover:bg-white justify-center"
        >
          <div className="w-12 flex justify-center">
            <UsersRound className="w-8 h-8 text-white group-hover:text-red-300" />
          </div>
          <div className="text-white diphylleia-regular text-1xl group-hover:text-red-300">
            {t("Students")}
          </div>
        </Link>

        <Link
          to="/teachers"
          className=" h-10 items-center group hover:bg-white justify-center hidden"
        >
          <div className="w-12 flex justify-center">
            <GraduationCap className="w-8 h-8 text-white group-hover:text-red-300" />
          </div>
          <div className="text-white diphylleia-regular text-1xl group-hover:text-red-300">
            {t("Teachers")}
          </div>
        </Link>

        <Link
          to="/payments"
          className=" flex h-10 items-center group hover:bg-white justify-center"
        >
          <div className="w-12 flex justify-center">
            <WalletCards className="w-8 h-8 text-white group-hover:text-red-300" />
          </div>
          <div className="text-white diphylleia-regular text-1xl group-hover:text-red-300">
            {t("Payments")}
          </div>
        </Link>
      </div>
      <button
        onClick={onClick}
        className="text-outline cursor-pointer flex items-center justify-center"
      >
        <div className="flex gap-3 mb-5 group hover:bg-white w-full justify-center items-center h-10 ">
          <LogOut className="w-8 h-8 text-white group-hover:text-red-300" />
          <div className="text-white group-hover:text-red-300 diphylleia-regular text-1xl">
            {t("Logout")}
          </div>
        </div>
      </button>
    </div>
  );
}
