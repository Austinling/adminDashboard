import { useState, useEffect } from "react";
import { TableHeader } from "./TableHeader.tsx";

export function Table() {
  const API_BASE = import.meta.env.VITE_API_BASE;

  type Student = {
    name: string;
    student_id: number;
    phoneNumber: number;
  };
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/students`)
      .then((res) => res.json())
      .then((data: Student[]) => setStudents(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="flex justify-center items-center">
        <TableHeader />
      </div>
      {students.map((student) => (
        <div key={student.student_id}></div>
      ))}
    </>
  );
}
