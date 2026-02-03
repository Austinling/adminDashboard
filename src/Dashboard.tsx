import { StudentGradePieChart } from "./StudentGradePieChart.tsx";
import type { Student } from "./StudentType.ts";
import type { Payment } from "./PaymentType.ts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PaymentStatusGraph } from "./PaymentStatusGraph.tsx";
import { PaymentLineGraph } from "./PaymentLineGraph.tsx";
import { PaymentLineDropDown } from "./PaymentLineDropDown.tsx";
import { StudentPieChartDropDown } from "./StudentPieChartDropDown.tsx";
import { Calendar } from "./Calendar.tsx";
import { CalendarButton } from "./CalendarButton.tsx";
import { MonthOrDayDropDown } from "./MonthOrDayDropDown.tsx";

export function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [lineGraphMode, setLineGraphMode] =
    useState<string>("Number of Payments");
  const [pieChartMode, setPieChartMode] = useState<string>("Grade");

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarRange, setCalendarRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [calendarMode, setCalendarMode] = useState<"single" | "range">("range");
  const [monthOrDay, setMonthOrDay] = useState<string>("Month");

  const API_BASE = import.meta.env.VITE_API_BASE;
  const navigate = useNavigate();

  const fetchStudents = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const fetchPayments = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/payments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setPayments(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchPayments();
  }, []);

  return (
    <div className="grid grid-cols-3 h-screen gap-4 p-4">
      <div className="bg-white border-2 rounded-4xl flex flex-col items-center justify-center col-span-2 p-3">
        <div className="text-xl font-bold text-gray-800 mb-4">
          {pieChartMode}
        </div>
        <StudentGradePieChart mode={pieChartMode} students={students} />
        <StudentPieChartDropDown
          mode={pieChartMode}
          setMode={setPieChartMode}
        />
      </div>
      <div className="bg-white border-2 rounded-4xl flex flex-col items-center justify-center p-3">
        <div className="text-xl font-bold text-gray-800 mb-4">
          Payment Status
        </div>
        <PaymentStatusGraph payments={payments} />
      </div>

      <div className="bg-white border-2 rounded-4xl col-span-3 flex flex-col items-center justify-center p-3">
        <div className="text-xl font-bold text-gray-800 mb-4">
          {lineGraphMode}
        </div>
        <PaymentLineGraph
          payments={payments}
          mode={lineGraphMode}
          range={calendarRange}
        />
        <div className="flex gap-10">
          <PaymentLineDropDown
            mode={lineGraphMode}
            setMode={setLineGraphMode}
          />
          {monthOrDay == "Day" && (
            <CalendarButton
              onClick={() => {
                setCalendarOpen(!calendarOpen);
                setCalendarMode("range");
                setCalendarRange({});
              }}
              optionalText={"Change Mode"}
            />
          )}
          <MonthOrDayDropDown
            mode={monthOrDay}
            setMode={(value) => {
              setMonthOrDay(value);
              if (value === "Month") {
                setCalendarOpen(false);
                setCalendarRange({});
              }
            }}
          />
        </div>

        {calendarOpen && (
          <Calendar
            open={calendarOpen}
            range={calendarRange}
            setRange={(calendarRange) => setCalendarRange(calendarRange)}
            onClose={() => setCalendarOpen(!calendarOpen)}
            mode={calendarMode}
            maxDays={12}
          />
        )}
      </div>
    </div>
  );
}
