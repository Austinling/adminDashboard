import type { PaymentLogType } from "./PaymentLogType.ts";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Authorization";

type StudentLogs = {
  paymentId: number | undefined;
  onClick: () => void;
};

export function PaymentLogs({ paymentId, onClick }: StudentLogs) {
  const [paymentLogs, setPaymentLogs] = useState<PaymentLogType[]>([]);

  const API_BASE = import.meta.env.VITE_API_BASE;
  const navigate = useNavigate();

  const userRole = useContext(UserContext);

  const fetchPaymentLogs = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${API_BASE}/payment_logs?payment_id=${paymentId}`,
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
      setPaymentLogs(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPaymentLogs();
  }, []);

  const filteredLogs = paymentLogs.filter((log) => {
    return log.payment_id == paymentId;
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
                    <div>{log.action}</div>
                    <div>{log.created_at}</div>
                    <div>{log.changed_by}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col text-center">
                      <div>
                        <b>Student:</b>
                      </div>
                      <div className="text-sm "> {detailsIntoJSON.student}</div>
                    </div>
                    <div className="flex flex-col text-center">
                      <div>
                        <b> Paid For Period:</b>{" "}
                      </div>
                      <div className="text-sm ">
                        {detailsIntoJSON.paid_for_period}
                      </div>
                    </div>
                    <div>
                      <b>Amount:</b> {detailsIntoJSON.amount}
                    </div>
                    <div>
                      <b>Status:</b> {detailsIntoJSON.status}
                    </div>
                    <div>
                      <b>Payment Date: </b>
                      {detailsIntoJSON.payment_date}
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
