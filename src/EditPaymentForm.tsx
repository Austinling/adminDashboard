import { useState, useEffect } from "react";
import { PopUp } from "./PopUp.tsx";
import { Calendar } from "./Calendar.tsx";
import { CalendarButton } from "./CalendarButton.tsx";
import type { Student } from "./StudentType.ts";

type PaymentForm = {
  payment: {
    payment_id: number;
    paid_for_period: string;
    student_id: number;
    amount: string;
    status: string;
    payment_date: string;
    student: string;
    amountType: string;
  };
  onClick: () => void;
  onSubmit: () => void;
};

export function EditPaymentForm({ payment, onClick, onSubmit }: PaymentForm) {
  const API_BASE = import.meta.env.VITE_API_BASE;

  const [userInput, setUserInput] = useState(payment.student);

  const [paid_for_period, setPeriod] = useState(payment.paid_for_period);
  const [amount, setAmount] = useState(payment.amount);
  const [amountType, setAmountType] = useState(payment.amountType);
  const [status, setStatus] = useState(payment.status);
  const [payment_date, setPaymentDate] = useState(payment.payment_date);
  const [showPopUp, setPopUp] = useState(false);
  const [showSuccessPopUp, setSuccessPopUp] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarRange, setCalendarRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [calendarMode, setCalendarMode] = useState<"single" | "range">("range");
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>();

  const statusMap = ["Unpaid", "Paid"];

  const fetchStudents = () => {
    fetch(`${API_BASE}/students`)
      .then((res) => res.json())
      .then((data: Student[]) => setStudents(data))
      .catch((err) => console.log(err));
  };

  useEffect(fetchStudents, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(userInput.toLowerCase()),
  );

  const formatToISO = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !selectedStudent ||
      !paid_for_period.trim() ||
      !amount.trim() ||
      !status ||
      !payment_date.trim()
    ) {
      setPopUp(false);
      setTimeout(() => setPopUp(true), 0);
      return;
    }
    setSuccessPopUp(false);
    setTimeout(() => setSuccessPopUp(true), 0);

    if (!selectedStudent) {
      alert("Please select a student from the list");
      return;
    }

    console.log("Submitting payment for:", selectedStudent);

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/payments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        payment_id: payment.payment_id,
        paid_for_period,
        student_id: selectedStudent.student_id,
        amount,
        status,
        payment_date,
        student: selectedStudent.name + " - " + selectedStudent.grade,
        amountType,
      }),
    });

    const paymentData = await res.json();
    const newPaymentId = paymentData.payment_id;

    const changedBy = localStorage.getItem("email") || "Unknown Admin";
    const action = "UPDATED";

    const logDetails = {
      student:
        payment.student != selectedStudent.name + " - " + selectedStudent.grade
          ? `${payment.student} -> ${selectedStudent.name + " - " + selectedStudent.grade}`
          : "No Changes Made",
      paid_for_period:
        payment.paid_for_period != paid_for_period
          ? `${payment.paid_for_period} -> ${paid_for_period}`
          : "No Changes Made",
      amount:
        payment.amount != amount
          ? `${payment.amount} -> ${amount}`
          : "No Changes Made",
      amountType:
        payment.amountType != amountType
          ? `${payment.amountType} -> ${amountType}`
          : "No Changes Made",
      status:
        payment.status != status
          ? `${payment.status} -> ${status}`
          : "No Changes Made",
      payment_date:
        payment.payment_date != payment_date
          ? `${payment.payment_date} -> ${payment_date}`
          : "No Changes Made",
    };

    const logResponse = await fetch(
      `${API_BASE}/payment_logs?payment_id=${newPaymentId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          payment_id: newPaymentId,
          action,
          changed_by: changedBy,
          details: JSON.stringify(logDetails),
        }),
      },
    );

    if (!logResponse.ok) {
      const errorData = await logResponse.json();
      console.error("Failed to create student log:", errorData);
      return;
    }

    setCalendarRange({});
    onSubmit();
  };

  useEffect(() => {
    if (!calendarRange.from) {
      return;
    }

    if (calendarMode === "single" && calendarRange.from) {
      setPaymentDate(formatToISO(calendarRange.from));
    }

    if (calendarMode === "range" && calendarRange.to) {
      setPeriod(
        `${formatToISO(calendarRange.from)}-${formatToISO(calendarRange.to)}`,
      );
    }
  }, [calendarRange, calendarMode]);

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-lg z-30"></div>

      {calendarOpen && (
        <Calendar
          open={calendarOpen}
          range={calendarRange}
          setRange={(calendarRange) => setCalendarRange(calendarRange)}
          onClose={() => setCalendarOpen(!calendarOpen)}
          mode={calendarMode}
        />
      )}

      {showPopUp && (
        <PopUp
          message="Please fill out all fields"
          color="red"
          onOrOff={true}
        />
      )}

      {showSuccessPopUp && (
        <PopUp message="Payment Edited" color="green" onOrOff={true} />
      )}

      <form
        onSubmit={handleSubmit}
        className="absolute shadow-lg rounded-2xl flex flex-col bg-white z-40 w-100 h-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto"
      >
        <div className="flex flex-col gap-2 p-5">
          <label>Choose the Student</label>

          <div className="flex flex-col gap-5">
            <input
              required
              value={userInput}
              className="bg-gray-300 p-3"
              onChange={(e) => {
                setUserInput(e.target.value);
                setSelectedStudent(null);
              }}
            ></input>

            {userInput && !selectedStudent && (
              <ul className="absolute z-50 bg-white border w-full max-h-40 overflow-auto">
                {filteredStudents.map((student) => (
                  <li
                    key={student.student_id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setSelectedStudent(student);
                      setUserInput(
                        `${student.name} - ${student.grade} (${student.student_id})`,
                      );
                    }}
                  >{`${student.name} - ${student.grade} (${student.student_id})`}</li>
                ))}
              </ul>
            )}
          </div>

          <label>Paid for Period</label>

          <div className="flex gap-5">
            <input
              required
              value={paid_for_period}
              readOnly
              className="bg-gray-300 p-3"
            ></input>
            <CalendarButton
              onClick={() => {
                setCalendarOpen(!calendarOpen);
                setCalendarMode("range");
                setCalendarRange({});
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-5">
          <label>Amount (MMK)</label>
          <input
            required
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-300 p-3"
          ></input>
        </div>
        <div className="flex flex-col gap-2 p-5">
          <label>Amount Type</label>
          <input
            required
            placeholder="Amount Type"
            value={amountType}
            onChange={(e) => setAmountType(e.target.value)}
            className="bg-gray-300 p-3"
          ></input>
        </div>
        <div className="flex flex-col gap-2  p-5">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusMap.map((status, index) => {
              return (
                <option key={index} value={status} className="border-2">
                  {status}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2 p-5">
          <label>Payment Date</label>

          <div className="flex gap-5">
            <input
              required
              value={payment_date}
              readOnly
              className="bg-gray-300 p-3"
            ></input>
            <CalendarButton
              onClick={() => {
                setCalendarOpen(!calendarOpen);
                setCalendarMode("single");
                setCalendarRange({});
              }}
            />{" "}
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex justify-evenly mb-5">
          <button
            className="bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)] cursor-pointer p-4 rounded-4xl w-40 h-10 flex items-center justify-center"
            type="submit"
          >
            Edit Payment
          </button>
          <button
            type="button"
            onClick={onClick}
            className="bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)] cursor-pointer p-4 rounded-4xl w-30 h-10 flex items-center justify-center"
          >
            Close
          </button>
        </div>
      </form>
    </>
  );
}
