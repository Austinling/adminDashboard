import { useState } from "react";
import { gradeMap } from "./GradeMap.ts";
import { PopUp } from "./PopUp.tsx";

type StudentForm = {
  onClick: () => void;
  onSubmit: () => void;
};

export function AddStudentForm({ onClick, onSubmit }: StudentForm) {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [grade, setGrade] = useState("一年级（上）");
  const [showPopUp, setPopUp] = useState(false);
  const [showSuccessPopUp, setSuccessPopUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phoneNumber.trim() || !grade) {
      setPopUp(false);
      setTimeout(() => setPopUp(true), 0);
      return;
    } else if (name.trim() || phoneNumber.trim() || grade) {
      setSuccessPopUp(false);
      setTimeout(() => setSuccessPopUp(true), 0);
    }

    await fetch(`${API_BASE}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phoneNumber,
        grade,
      }),
    });

    setName("");
    setPhoneNumber("");
    setGrade("");
    onSubmit();
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-lg z-30"></div>

      {showPopUp && (
        <PopUp message="Please enter all fields" color="red" onOrOff={true} />
      )}

      {showSuccessPopUp && (
        <PopUp message="User Added" color="green" onOrOff={true} />
      )}

      <form className="absolute shadow-lg rounded-2xl flex flex-col bg-white z-40 w-100 h-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-2 p-5">
          <label>Name</label>
          <input
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-300 p-3"
          ></input>
        </div>
        <div className="flex flex-col gap-2 p-5">
          <label>Phone Number</label>
          <input
            required
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-gray-300 p-3"
          ></input>
        </div>
        <div className="flex flex-col gap-2  p-5">
          <label>Grade</label>
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
        <div className="flex-1" />
        <div className="flex justify-evenly mb-5">
          <button
            className="bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)] p-4 rounded-4xl w-40 h-10 flex items-center justify-center"
            onClick={handleSubmit}
            type="submit"
          >
            Add Student
          </button>
          <button
            onClick={onClick}
            className="bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)] p-4 rounded-4xl w-30 h-10 flex items-center justify-center"
          >
            Close
          </button>
        </div>
      </form>
    </>
  );
}
