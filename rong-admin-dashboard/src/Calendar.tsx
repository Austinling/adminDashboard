import { useState } from "react";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getFirstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const lastDayOfWeek = new Date(year, month, daysInMonth).getDay();

  const finalDay = 6 - lastDayOfWeek;

  const days = [];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < getFirstDayOfMonth; i++) {
    days.push("");
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  for (let i = 0; i < finalDay; i++) {
    days.push("");
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2">
      <div className="w-70 h-10 border-2 text-3xl font-bold flex items-center justify-center">
        {currentDate.toLocaleDateString("default", { month: "long" })}
      </div>
      <div className="grid grid-cols-7">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="w-10 h-10 font-bold border-2 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className="w-10 h-10 border-2 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
