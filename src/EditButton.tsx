import { Ellipsis, SquarePen, Info } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type EditButtonProp = {
  onClick: () => void;
  onInfoClick: () => void;
};

export function EditButton({ onClick, onInfoClick }: EditButtonProp) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const thisRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showMenu) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (thisRef.current && !thisRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMenu]);

  return (
    <div ref={thisRef} className="relative inline-block">
      <button
        className=" w-20 h-10 flex justify-center items-center rounded-4xl hover:bg-red-400 hover:text-white"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Ellipsis className="" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden ">
          <button
            onClick={onClick}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-t border-gray-100"
          >
            <SquarePen />
            Edit
          </button>
          <button
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
            onClick={onInfoClick}
          >
            <Info />
            About
          </button>
        </div>
      )}
    </div>
  );
}
