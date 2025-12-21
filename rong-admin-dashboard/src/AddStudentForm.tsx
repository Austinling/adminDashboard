import { useState } from "react";

export function AddStudentForm() {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [grade, setGrade] = useState("");

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
    <div>
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
      <input
        placeholder="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      ></input>

      <button onClick={handleSubmit}>Add Student</button>
    </div>
  );
}
