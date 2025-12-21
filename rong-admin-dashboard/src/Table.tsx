import { useState, useEffect } from "react";
import { gradeMap } from "./GradeMap.ts";
import type { Student } from "./StudentType.ts";

type studentData = {
  students: Student[];
};

export function Table({ students }: studentData) {
  return (
    <>
      <div className="overflow-auto max-h-130">
        <table className="bg-white w-full table-fixed ">
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
                <td className="w-1/4 px-4 py-3 text-center">
                  {gradeMap[student.grade] ?? student.grade}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
