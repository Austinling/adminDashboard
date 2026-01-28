import Slider from "rc-slider";
import { useState, useEffect } from "react";
import "rc-slider/assets/index.css";
import { CalendarButton } from "./CalendarButton";
import { Calendar } from "./Calendar";

type PaymentFilterProp = {
  paymentStatus: string;
  setPaymentStatus: (status: string) => void;
  minimumPayment: number;
  maximumPayment: number;
  setParentRange: (range: number[]) => void;
  calendarRange: CalendarRange;
  setCalendarRange: (date: CalendarRange) => void;
};

type CalendarRange = {
  from?: Date;
  to?: Date;
};

export function PaymentFilter({
  paymentStatus,
  setPaymentStatus,
  minimumPayment,
  maximumPayment,
  setParentRange,
  calendarRange,
  setCalendarRange,
}: PaymentFilterProp) {
  const [paymentRange, setPaymentRange] = useState<number[]>([
    minimumPayment,
    maximumPayment,
  ]);

  const marks = {
    [minimumPayment]: `${paymentRange[0]}`,
    [maximumPayment]: `${paymentRange[1]}`,
  };

  const formatToISO = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const [paid_for_period, setPeriod] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarMode, setCalendarMode] = useState<"single" | "range">("range");

  useEffect(() => {
    setPaymentRange([minimumPayment, maximumPayment]);
  }, [minimumPayment, maximumPayment]);

  useEffect(() => {
    if (!calendarRange.from) {
      return;
    }

    if (calendarMode === "range" && calendarRange.to) {
      setPeriod(
        `${formatToISO(calendarRange.from)}-${formatToISO(calendarRange.to)}`,
      );
    }
  }, [calendarRange, calendarMode]);

  return (
    <div className="absolute w-100 h-100 flex items-center justify-items-start border-2 bg-white border-gray-400 rounded-4xl z-100">
      <div>
        <div className="p-3">
          <h3 className="border-b-2 mb-5">Payment Period</h3>
          <div className="flex flex-col gap-5">
            <input
              required
              value={paid_for_period}
              readOnly
              className="bg-gray-300 p-3"
            ></input>
            {calendarOpen && (
              <Calendar
                open={calendarOpen}
                range={calendarRange}
                setRange={(calendarRange) => setCalendarRange(calendarRange)}
                onClose={() => setCalendarOpen(!calendarOpen)}
                mode={calendarMode}
              />
            )}
            <CalendarButton
              onClick={() => {
                setCalendarOpen(!calendarOpen);
                setCalendarMode("range");
                setCalendarRange({});
              }}
            />
          </div>

          <div className="p-3">
            <h3 className="border-b-2 mb-5">Tuition Fee</h3>
            <Slider
              range
              id="2"
              min={minimumPayment}
              max={maximumPayment}
              defaultValue={paymentRange}
              marks={marks}
              onChange={(value) => {
                if (Array.isArray(value)) {
                  setPaymentRange([value[0], value[1]]);
                  setParentRange([value[0], value[1]]);
                }
              }}
            />
          </div>
          <div className="p-3">
            <h3 className="border-b-2">Payment Status</h3>
            <div className="flex gap-3 p-3">
              <button
                className={`border-2 w-20 hover:bg-gray-200 ${paymentStatus === "Paid" ? "bg-gray-500 text-white " : "bg-white"}`}
                onClick={() => {
                  const newPayment = paymentStatus === "Paid" ? "" : "Paid";
                  setPaymentStatus(newPayment);
                }}
              >
                Paid
              </button>
              <button
                className={`border-2 w-20 hover:bg-gray-200 ${paymentStatus === "Unpaid" ? "bg-gray-500 text-white " : "bg-white"}`}
                onClick={() => {
                  const newPayment = paymentStatus === "Unpaid" ? "" : "Unpaid";
                  setPaymentStatus(newPayment);
                }}
              >
                Unpaid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
