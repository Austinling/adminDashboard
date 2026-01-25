import { useState } from "react";
import rongLogo from "./assets/images/rongbg.png";
import { Menu } from "lucide-react";

type HeaderProps = {
  headerShow: () => void;
};

export function Header({ headerShow }: HeaderProps) {
  return (
    <div className="h-20 w-full bg-red-300 border-b-2 border-b-white z-50 sticky top-0 flex justify-star items-center gap-3">
      <Menu
        className="ml-4 "
        onClick={() => {
          headerShow();
        }}
      />
      <img src={rongLogo} alt="Logo" className="w-20 p-3 ml-5"></img>
      <div className="text-white text-1xl lg:text-2xl diphylleia-regular ">
        Rong Admin Panel
      </div>
    </div>
  );
}
