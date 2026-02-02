import type { StudentLogType } from "./StudentLogType.ts";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Authorization";

export function StudentLogs({ studentId }: { studentId: number | undefined }) {
  const [studentLogs, setStudentLogs] = useState<StudentLogType[]>([]);

  const API_BASE = import.meta.env.VITE_API_BASE;
  const navigate = useNavigate();

  const userRole = useContext(UserContext);

  const fetchStudentLogs = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/student_logs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        userRole?.setRole(null);
        navigate("/login");
        return;
      }

      const data = await res.json();
      setStudentLogs(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const filteredLogs = studentLogs.filter((log) => {
    log.student_id == studentId;
  });

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-lg z-30"></div>

      <div className="absolute shadow-lg rounded-2xl flex flex-col bg-white z-40 w-100 h-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto">
        {filteredLogs.map((log) => {
          return (
            <div>
              {log.action} {log.performed_by} {log.created_at}
            </div>
          );
        })}
      </div>
    </>
  );
}
