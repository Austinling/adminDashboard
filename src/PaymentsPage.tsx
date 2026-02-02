import { Table } from "./Table.tsx";
import type { Payment } from "./PaymentType.ts";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Authorization.tsx";
import { SearchBar } from "./SearchBar.tsx";
import { AddStudentButton } from "./AddStudentButton.tsx";
import { AddPayment } from "./AddPayment.tsx";
import { DeleteButton } from "./DeleteButton.tsx";
import { PaymentFilter } from "./PaymentFilter.tsx";
import { PaymentFilterButton } from "./PaymentFilterButton.tsx";
import { EditPaymentForm } from "./EditPaymentForm.tsx";
import { EditButton } from "./EditButton.tsx";
import { PaymentLogs } from "./PaymentLogs.tsx";

export function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchName, setSearch] = useState("");
  const [open, setPaymentOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [calendarRange, setCalendarRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});

  const [paymentDateRange, setPaymentDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showPaymentLog, setShowPaymentLog] = useState<boolean>(false);
  const [editedPayment, setEditedPayment] = useState<Payment>();

  const API_BASE = import.meta.env.VITE_API_BASE;

  const userRole = useContext(UserContext);
  const navigate = useNavigate();
  const [parentRange, setPaymentRange] = useState<number[]>([0, 100000000]);

  function toggleSelect(id: number) {
    setSelectedKeys((selectedIds) =>
      selectedIds.includes(id)
        ? selectedIds.filter((filteredId) => filteredId != id)
        : [...selectedIds, id],
    );
  }

  function findMin(arr: number[]) {
    if (arr.length === 0) return 0;

    return Math.min(...arr);
  }

  function findMax(arr: number[]) {
    if (arr.length === 0) return 0;

    return Math.max(...arr);
  }

  const fetchPayments = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/payments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      alert("Session expired! Please login again.");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      userRole?.setRole(null);
      navigate("/login");
      return;
    }

    if (res.ok) {
      const data: Payment[] = await res.json();
      setPayments(data);
    }
  };

  const deletePayments = async () => {
    if (selectedKeys.length === 0) return;

    let userResponse = confirm(
      "Are you sure you want to delete? \nEither OK or Cancel.",
    );

    if (!userResponse) {
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/payments`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ids: selectedKeys,
      }),
    });

    if (res.status === 401) {
      alert("Session expired! Please login again.");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
      return;
    }

    if (res.ok) {
      fetchPayments();
      setSelectedKeys([]);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) => {
    const studentName = payment.student?.includes(searchName);
    const studentPaymentStatus = payment.status.includes(paymentStatus);
    const paymentRange =
      Number(payment.amount) >= parentRange[0] &&
      Number(payment.amount) <= parentRange[1];

    let matchesDate = true;
    let paymentDate = true;

    if (calendarRange.from && calendarRange.to) {
      const periodParts = payment.paid_for_period.split(/-(?=\d{4})/);
      if (periodParts.length === 2) {
        const [payStart, payEnd] = periodParts;

        const calendarStart = calendarRange.from.toISOString().split("T")[0];
        const calendarEnd = calendarRange.to.toISOString().split("T")[0];

        matchesDate = payStart >= calendarStart && payEnd <= calendarEnd;
      }
    }

    if (paymentDateRange.from && paymentDateRange.to) {
      const periodParts = payment.payment_date;
      if (periodParts) {
        const calendarStart = paymentDateRange.from.toISOString().split("T")[0];
        const calendarEnd = paymentDateRange.to.toISOString().split("T")[0];

        paymentDate =
          periodParts >= calendarStart && periodParts <= calendarEnd;
      }
    }

    return (
      studentName &&
      studentPaymentStatus &&
      paymentRange &&
      matchesDate &&
      paymentDate
    );
  });

  const paymentAmounts = payments.map((p) => Number(p.amount));

  return (
    <div className="flex flex-col">
      <div className="flex p-5">
        <SearchBar searchName={searchName} searchingChange={setSearch} />
        <PaymentFilterButton open={filterOpen} setOpen={setFilterOpen} />
        <PaymentFilter
          key={`${findMin(paymentAmounts)}-${findMax(paymentAmounts)}`}
          open={filterOpen}
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
          minimumPayment={findMin(paymentAmounts)}
          maximumPayment={findMax(paymentAmounts)}
          setParentRange={setPaymentRange}
          calendarRange={calendarRange}
          setCalendarRange={setCalendarRange}
          paymentDateRange={paymentDateRange}
          setPaymentDateRange={setPaymentDateRange}
          onClose={() => setFilterOpen(false)}
        />
        <div className="flex"></div>
        <div className="flex flex-1"></div>
        <div className="flex flex-row gap-3">
          <AddStudentButton
            onClick={() => setPaymentOpen(!open)}
            message="Add Payment"
          />
          {userRole?.role === "admin" && (
            <DeleteButton
              onClick={() => {
                deletePayments();
                setDelete(!isDelete);
                setSelectedKeys([]);
              }}
              isOn={isDelete}
            />
          )}
        </div>
      </div>
      {open && (
        <AddPayment
          onSubmit={() => {
            fetchPayments();
          }}
          onClick={() => setPaymentOpen(false)}
        />
      )}
      {showEdit && editedPayment && (
        <EditPaymentForm
          payment={editedPayment}
          onSubmit={fetchPayments}
          onClick={() => setShowEdit(!showEdit)}
        />
      )}
      {showPaymentLog && editedPayment && (
        <PaymentLogs
          paymentId={editedPayment.payment_id}
          onClick={() => setShowPaymentLog(false)}
        />
      )}
      <Table
        data={filteredPayments}
        getKey={(p) => p.payment_id}
        columns={[
          {
            header: "Payment ID",
            render: (s) => (
              <div className="flex items-center justify-center gap-10">
                {isDelete && (
                  <input
                    type="checkbox"
                    checked={selectedKeys.includes(s.payment_id)}
                    onChange={() => isDelete && toggleSelect(s.payment_id)}
                    onClick={(e) => e.stopPropagation()}
                  ></input>
                )}

                <span>{s.payment_id}</span>
              </div>
            ),
          },
          { header: "Student ID", render: (p) => p.student_id },
          { header: "Student", render: (p) => p.student },
          { header: "Payment Period", render: (p) => p.paid_for_period },
          { header: "Amount (MMK)", render: (p) => p.amount },
          { header: "Status", render: (p) => p.status },
          { header: "Payment Date", render: (p) => p.payment_date },
          ...(userRole?.role === "admin"
            ? [
                {
                  header: "",
                  render: (p: Payment) => (
                    <EditButton
                      onClick={() => {
                        setEditedPayment(p);
                        setShowEdit(!showEdit);
                      }}
                      onInfoClick={() => {
                        setEditedPayment(p);
                        setShowPaymentLog(!showPaymentLog);
                      }}
                    />
                  ),
                },
              ]
            : []),
        ]}
        selectedKeys={selectedKeys}
        toggleSelect={toggleSelect}
        isDelete={isDelete}
      />{" "}
    </div>
  );
}
