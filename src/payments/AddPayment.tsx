import { useState, useEffect } from "react";
import { PopUp } from "../components/PopUp.tsx";
import { Calendar } from "../components/Calendar.tsx";
import { CalendarButton } from "../components/CalendarButton.tsx";
import type { Student } from "../types/StudentType.ts";
import { useTranslation } from "react-i18next";

type PaymentForm = {
  onClick: () => void;
  onSubmit: () => void;
};

export function AddPayment({ onClick, onSubmit }: PaymentForm) {
  const API_BASE = import.meta.env.VITE_API_BASE;

  const [userInput, setUserInput] = useState("");
  const [paid_for_period, setPeriod] = useState("");
  const [amount, setAmount] = useState("");
  const [amountType, setAmountType] = useState("");
  const [status, setStatus] = useState("Unpaid");
  const [payment_date, setPaymentDate] = useState("");
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

  const { t } = useTranslation();
  const statusMap = [t("Unpaid"), t("Paid")];

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
      !paid_for_period.trim() ||
      !amount.trim() ||
      !status.trim() ||
      !payment_date.trim()
    ) {
      setPopUp(false);
      setTimeout(() => setPopUp(true), 0);
      return;
    }

    if (!selectedStudent) {
      alert("Please select a student from the list");
      return;
    }

    console.log("Submitting payment for:", selectedStudent);

    const paymentResponse = await fetch(`${API_BASE}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paid_for_period,
        student_id: selectedStudent.student_id,
        amount,
        status,
        payment_date,
        student: selectedStudent.name + " - " + selectedStudent.grade,
        amountType,
      }),
    });

    const paymentData = await paymentResponse.json();
    const newPaymentId = paymentData.payment_id;
    const newStudent = paymentData.student;

    if (paymentResponse.ok) {
      setSuccessPopUp(false);
      setTimeout(() => setSuccessPopUp(true), 0);
    }

    const changedBy = localStorage.getItem("email") || "Unknown Admin";
    const action = "CREATED";
    const logDetails = {
      student: newStudent,
      paid_for_period,
      amount,
      status,
      payment_date,
      amountType,
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
      console.error("Failed to create payment log:", errorData);
      return;
    }

    setPeriod("");
    setAmount("");
    setStatus("");
    setPaymentDate("");
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
          message={t("Please_Enter_All_Fields")}
          color="red"
          onOrOff={true}
        />
      )}

      {showSuccessPopUp && (
        <PopUp message={t("Success")} color="green" onOrOff={true} />
      )}

      <form
        onSubmit={handleSubmit}
        className="absolute shadow-lg rounded-2xl flex flex-col bg-white z-40 w-120 h-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto"
      >
        <div className="flex flex-col gap-2 p-5">
          <label>{t("Choose_The_Student")}</label>

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

          <label>{t("Paid_For_Period")}</label>

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
              optionalText={t("Choose_Day")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-5">
          <label>{t("Amount")}</label>
          <input
            required
            placeholder={t("Amount")}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-300 p-3"
          ></input>
        </div>
        <div className="flex flex-col gap-2 p-5">
          <label>{t("Amount_Type")}</label>
          <input
            required
            placeholder={t("Amount_Type")}
            value={amountType}
            onChange={(e) => setAmountType(e.target.value)}
            className="bg-gray-300 p-3"
          ></input>
        </div>
        <div className="flex flex-col gap-2  p-5">
          <label>{t("Status")}</label>
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
          <label>{t("Payment_Date")}</label>

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
              optionalText={t("Choose_Day")}
            />
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex justify-evenly mb-5">
          <button
            className="bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)] cursor-pointer p-4 rounded-4xl w-40 h-10 flex items-center justify-center"
            type="submit"
          >
            {t("Add_Payment")}
          </button>
          <button
            type="button"
            onClick={onClick}
            className="bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)] cursor-pointer p-4 rounded-4xl w-30 h-10 flex items-center justify-center"
          >
            {t("Close")}
          </button>
        </div>
      </form>
    </>
  );
}
