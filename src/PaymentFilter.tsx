import Slider from "rc-slider";
import { useState, useEffect } from "react";
import "rc-slider/assets/index.css";
import { CalendarButton } from "./CalendarButton";
import { Calendar } from "./Calendar";
import { X } from "lucide-react";

type PaymentFilterProp = {
  open: boolean;
  paymentStatus: string;
  setPaymentStatus: (status: string) => void;
  minimumPayment: number;
  maximumPayment: number;
  setParentRange: (range: number[]) => void;
  calendarRange: CalendarRange;
  setCalendarRange: (date: CalendarRange) => void;
  paymentDateRange: CalendarRange;
  setPaymentDateRange: (date: CalendarRange) => void;
  onClose: () => void;
};

type CalendarRange = {
  from?: Date;
  to?: Date;
};

export function PaymentFilter({
  open,
  paymentStatus,
  setPaymentStatus,
  minimumPayment,
  maximumPayment,
  setParentRange,
  calendarRange,
  setCalendarRange,
  paymentDateRange,
  setPaymentDateRange,
  onClose,
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
  const [periodCalendarOpen, setPeriodCalendarOpen] = useState(false);
  const [dateCalendarOpen, setDateCalendarOpen] = useState(false);
  const [paymentDate, setPaymentDate] = useState("");

  useEffect(() => {
    setPaymentRange([minimumPayment, maximumPayment]);
  }, [minimumPayment, maximumPayment]);

  useEffect(() => {
    if (!calendarRange.from) {
      return;
    }

    if (calendarRange.to) {
      setPeriod(
        `${formatToISO(calendarRange.from)}-${formatToISO(calendarRange.to)}`,
      );
    }
  }, [calendarRange]);

  useEffect(() => {
    if (!paymentDateRange.from) {
      return;
    }

    if (paymentDateRange.to) {
      setPaymentDate(
        `${formatToISO(paymentDateRange.from)}-${formatToISO(paymentDateRange.to)}`,
      );
    }
  }, [paymentDateRange]);

  return (
    <div
      className={`absolute w-70 bg-white border-2 border-gray-400 rounded-lg shadow-lg z-100 top-10 transform transition-all duration-300 ease-out origin-top ${
        open
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
          : "opacity-0 -translate-y-2 scale-95 pointer-events-none invisible"
      }`}
    >
      <X
        className="absolute right-0 top-0 mr-3 mt-3 cursor-pointer hover:scale-110"
        onClick={onClose}
      />
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
            {periodCalendarOpen && (
              <Calendar
                open={periodCalendarOpen}
                range={calendarRange}
                setRange={(calendarRange) => setCalendarRange(calendarRange)}
                onClose={() => setPeriodCalendarOpen(false)}
                mode="range"
              />
            )}
            <CalendarButton
              onClick={() => {
                setPeriodCalendarOpen(!periodCalendarOpen);
                setCalendarRange({});
              }}
            />
          </div>

          <h3 className="border-b-2 mb-5">Payment Date</h3>
          <div className="flex flex-col gap-5">
            <input
              required
              value={paymentDate}
              readOnly
              className="bg-gray-300 p-3"
            ></input>
            {dateCalendarOpen && (
              <Calendar
                open={dateCalendarOpen}
                range={paymentDateRange}
                setRange={(paymentDateRange) =>
                  setPaymentDateRange(paymentDateRange)
                }
                onClose={() => setDateCalendarOpen(false)}
                mode="range"
              />
            )}
            <CalendarButton
              onClick={() => {
                setDateCalendarOpen(!dateCalendarOpen);
                setPaymentDateRange({});
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
