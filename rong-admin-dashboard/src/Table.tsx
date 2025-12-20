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
      <div className="overflow-auto max-h-150">
        <table className="bg-white w-full table-fixed mt-10 ">
          <thead className="sticky top-0 z-10 bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)]">
            <tr>
              <th className="w-1/4 px-4 py-6">Student ID</th>
              <th className="w-1/4 px-4 py-6">Name</th>
              <th className="w-1/4 px-4 py-6">Phone Number</th>
              <th className="w-1/4 px-4 py-6">Grade</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.student_id} className="w-full">
                <td className="w-1/4 px-4 py-3 text-center">
                  {student.student_id}
                </td>
                <td className="w-1/4 px-4 py-3 text-center">{student.name}</td>
                <td className="w-1/4 px-4 py-3 text-center">
                  {student.phoneNumber}
                </td>
                <td className="w-1/4 px-4 py-3 text-center">{student.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
