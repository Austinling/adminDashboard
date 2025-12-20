import { useState, useEffect } from "react";

export function Table() {
  const API_BASE = import.meta.env.VITE_API_BASE;

  type Student = {
    name: string;
    student_id: number;
    phoneNumber: number;
    grade: string;
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
      <table className="bg-white w-100 h-10 mt-10">
        <thead className="w-full">
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.student_id} className="w-full">
              <th>{student.student_id}</th>
              <th>{student.name}</th>
              <th>{student.phoneNumber}</th>
              <th>{student.grade}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
