import { useState } from "react";
import { gradeMap } from "./GradeMap.ts";
import { classDateArray } from "./ClassDate.ts";
import { timePeriodArray } from "./TimePeriod.ts";
import { PopUp } from "./PopUp.tsx";
import { useTranslation } from "react-i18next";

type StudentForm = {
  onClick: () => void;
  onSubmit: () => void;
};

export function AddStudentForm({ onClick, onSubmit }: StudentForm) {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [grade, setGrade] = useState("幼一");
  const [timePeriod, setTimePeriod] = useState(timePeriodArray[0] || "");
  const [classDate, setClassDate] = useState("天天班");
  const [showPopUp, setPopUp] = useState(false);
  const [showSuccessPopUp, setSuccessPopUp] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !phoneNumber.trim() ||
      !grade.trim() ||
      !classDate.trim() ||
      !timePeriod.trim()
    ) {
      setPopUp(false);
      setTimeout(() => setPopUp(true), 0);
      return;
    }

    const studentResponse = await fetch(`${API_BASE}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phoneNumber,
        grade,
        timePeriod,
        classDate,
      }),
    });

    if (!studentResponse.ok) {
      console.error("Failed to create student");
      return;
    }

    setSuccessPopUp(false);
    setTimeout(() => setSuccessPopUp(true), 0);

    const studentData = await studentResponse.json();
    const newStudentId = studentData.student_id;

    const changedBy = localStorage.getItem("email") || "Unknown Admin";
    const action = "CREATED";
    const logDetails = {
      name,
      phoneNumber,
      grade,
      timePeriod,
      classDate,
    };

    const logResponse = await fetch(
      `${API_BASE}/student_logs?student_id=${newStudentId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          student_id: newStudentId,
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

    setName("");
    setPhoneNumber("");
    setGrade("一年级（上）");
    setTimePeriod(timePeriodArray[0] || "");
    setClassDate("天天班");
    onSubmit();
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-lg z-30"></div>

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
        className="absolute shadow-lg rounded-2xl flex flex-col bg-white z-40 w-100 h-150 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex flex-col gap-2 p-5">
          <label>{t("Name")}</label>
          <input
            required
            placeholder={t("Name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-300 p-3"
          ></input>
        </div>
        <div className="flex flex-col gap-2 p-5">
          <label>{t("Phone_Number")}</label>
          <input
            required
            placeholder={t("Phone_Number")}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-gray-300 p-3"
          ></input>
        </div>
        <div className="flex flex-col gap-2  p-5">
          <label>{t("Grade")}</label>
          <select value={grade} onChange={(e) => setGrade(e.target.value)}>
            {Object.entries(gradeMap).map(([key, value]) => {
              return (
                <option key={key} value={value} className="border-2">
                  {value}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2  p-5">
          <label>{t("Class_Date")}</label>
          <select
            value={classDate}
            onChange={(e) => setClassDate(e.target.value)}
          >
            {classDateArray.map((value) => {
              return (
                <option key={value} value={value} className="border-2">
                  {value}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2  p-5">
          <label>{t("Time_Period")}</label>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            {timePeriodArray.map((value) => {
              return (
                <option key={value} value={value} className="border-2">
                  {value}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex-1" />
        <div className="flex justify-evenly mb-5">
          <button
            className="bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)] cursor-pointer p-4 rounded-4xl w-40 h-10 flex items-center justify-center"
            type="submit"
          >
            {t("Add_Student")}
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
