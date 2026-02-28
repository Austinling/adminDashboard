import { useState, useEffect } from "react";

type PopUpProp = {
  message: string;
  color: string;
  onOrOff: boolean;
};

const colorMap: Record<string, string> = {
  red: "bg-red-500",
  green: "bg-green-500",
};

export function PopUp({ message, color, onOrOff }: PopUpProp) {
  const [visible, setVisible] = useState(onOrOff);

  useEffect(() => {
    if (!onOrOff) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [onOrOff]);

  return (
    <div
      className={`absolute w-50 h-10 flex items-center justify-center text-white ${
        colorMap[color]
      } p-5 z-50 top-1/8 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
