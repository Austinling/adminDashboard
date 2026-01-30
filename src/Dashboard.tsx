import { StudentGradePieChart } from "./StudentGradePieChart.tsx";
import type { Student } from "./StudentType.ts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);

  const API_BASE = import.meta.env.VITE_API_BASE;
  const navigate = useNavigate();

  const fetchStudents = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="grid grid-cols-3 h-screen gap-4 p-4">
      <div className="bg-white border-2 rounded-4xl flex flex-col items-center justify-center col-span-2">
        <div className="text-xl font-bold text-gray-800 mb-4">
          Student Grades
        </div>
        <StudentGradePieChart students={students} />
      </div>
      <div className="bg-white border-2 rounded-4xl"></div>

      <div className="bg-white border-2 rounded-4xl"></div>

      <div className="bg-white border-2 rounded-4xl"></div>
    </div>
  );
}
