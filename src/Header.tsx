import rongLogo from "./assets/images/rongbg.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type HeaderProps = {
  headerShow: () => void;
};

export function Header({ headerShow }: HeaderProps) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="h-20 w-full bg-red-300 border-b-2 border-b-white z-50 sticky top-0 flex justify-star items-center gap-3">
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
        Rong Admin Panel
      </div>
    </div>
  );
}
