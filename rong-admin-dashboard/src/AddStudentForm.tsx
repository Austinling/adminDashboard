import { useState } from "react";
import { gradeMap } from "./GradeMap.ts";

export function AddStudentForm() {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [grade, setGrade] = useState("一年级（上）");

  const handleSubmit = async () => {
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
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-lg z-30 invisible"></div>

      <div className="absolute border-2 bg-white z-40 w-100 h-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <label>Name</label>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>Phone Number</label>
        <input
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        ></input>
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
        ;<button onClick={handleSubmit}>Add Student</button>
      </div>
    </>
  );
}
