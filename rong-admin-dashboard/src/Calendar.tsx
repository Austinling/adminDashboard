import { useState, useRef, useEffect } from "react";
import rightArrow from "./assets/images/right-arrow.png";

type CalendarRange = {
  from?: Date;
  to?: Date;
};

type CalendarType = {
  open: boolean;
  range: CalendarRange;
  setRange: (range: CalendarRange) => void;
  onClose: () => void;
  mode: string;
};

export function Calendar({
  open,
  range,
  setRange,
  onClose,
  mode,
}: CalendarType) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentRef = useRef<HTMLDivElement | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getFirstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const lastDayOfWeek = new Date(year, month, daysInMonth).getDay();

  const finalDay = 6 - lastDayOfWeek;

  const days = [];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < getFirstDayOfMonth; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  for (let i = 0; i < finalDay; i++) {
    days.push(null);
  }

  const handleSelect = (chosenDate: Date) => {
    if (mode === "single") {
      setRange({ from: chosenDate, to: undefined });
      return;
    }

    if (!range.from || (range.from && range.to)) {
      setRange({ from: chosenDate, to: undefined });
      return;
    }

    if (chosenDate < range.from) {
      setRange({ from: chosenDate, to: range.from });
      return;
    }

    setRange({ from: range.from, to: chosenDate });
  };

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        currentRef.current &&
        !currentRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-1/2 z-100 transform transition-all duration-300 ease-out
      ${open ? "opacity-100 scale-100" : "opacity-0  scale-95"}`}
      ref={currentRef}
    >
      <div className="w-70 h-10 border-2 text-2xl font-bold grid grid-cols-[40px_1fr_40px] items-center bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)]">
        <button
          onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
          className="justify-center p-2"
        >
          <img
            src={rightArrow}
            className="w-5 rotate-180 hover:scale-120 cursor-pointer"
          ></img>
        </button>
        <div className=" text-center ">
          {currentDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <button
          onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
          className="justify-center p-2"
        >
          <img
            src={rightArrow}
            className="w-5  hover:scale-120 cursor-pointer"
          ></img>
        </button>
      </div>

      <div className="grid grid-cols-7 bg-white">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="w-10 h-10 font-bold border-2 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const currentDay = day ? new Date(year, month, day) : null;

          const isFirst =
            range.from &&
            currentDay &&
            currentDay.toDateString() === range.from.toDateString();

          const isLast =
            range.to &&
            currentDay &&
            currentDay.toDateString() === range.to.toDateString();

          const inRange =
            mode === "range" &&
            range.from &&
            range.to &&
            currentDay &&
            currentDay > range.from &&
            currentDay < range.to;

          return (
            <div
              key={index}
              className={`w-10 h-10 border-2 flex items-center justify-center ${
                isFirst || isLast
                  ? "bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)]"
                  : ""
              } ${day ? "hover:scale-120" : ""} 
              ${inRange ? "bg-gray-400" : ""}`}
              onClick={() => {
                if (!day) {
                  return;
                }

                handleSelect(new Date(year, month, day));
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
