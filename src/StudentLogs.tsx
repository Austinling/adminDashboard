import type { StudentLogType } from "./StudentLogType.ts";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Authorization";
import { useTranslation } from "react-i18next";

type StudentLogs = {
  studentId: number | undefined;
  onClick: () => void;
};

export function StudentLogs({ studentId, onClick }: StudentLogs) {
  const [studentLogs, setStudentLogs] = useState<StudentLogType[]>([]);

  const API_BASE = import.meta.env.VITE_API_BASE;
  const navigate = useNavigate();

  const userRole = useContext(UserContext);
  const { t } = useTranslation();

  const fetchStudentLogs = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${API_BASE}/student_logs?student_id=${studentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
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

  useEffect(() => {
    fetchStudentLogs();
  }, []);

  const filteredLogs = studentLogs.filter((log) => {
    return log.student_id == studentId;
  });

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-lg z-30"></div>

      <div className="absolute shadow-lg rounded-2xl flex flex-col bg-white z-40 w-120 h-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto items-center justify-between">
        <div className="flex-1 overflow-auto w-full">
          {filteredLogs.map((log) => {
            const detailsIntoJSON = JSON.parse(log.details);

            return (
              <>
                <div className="p-3 flex flex-col items-center">
                  <div className="flex gap-3 border-b-2 font-bold mb-2">
                    <div>{t(`${log.action}`)}</div>
                    <div>{log.created_at}</div>
                    <div>{log.changed_by}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div>
                      <b>{t("Name")}:</b> {detailsIntoJSON.name}
                    </div>
                    <div>
                      <b>{t("Phone_Number")}:</b> {detailsIntoJSON.phoneNumber}
                    </div>
                    <div>
                      <b>{t("Grade")}:</b> {detailsIntoJSON.grade}
                    </div>
                    <div>
                      <b>{t("Time_Period")}:</b> {detailsIntoJSON.timePeriod}
                    </div>
                    <div>
                      <b>{t("Class_Date")}:</b> {detailsIntoJSON.classDate}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onClick}
          className="bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)] cursor-pointer p-4 rounded-4xl w-30 h-10 flex items-center justify-center mb-4"
        >
          Close
        </button>
      </div>
    </>
  );
}
