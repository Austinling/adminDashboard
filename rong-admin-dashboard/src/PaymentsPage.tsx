import { Table } from "./Table.tsx";
import type { Payment } from "./PaymentType.ts";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar.tsx";
import { Filter } from "./Filter.tsx";
import { AddStudentButton } from "./AddStudentButton.tsx";
import { AddPayment } from "./AddPayment.tsx";

export function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paid_for_period, setPeriod] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [open, setPaymentOpen] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE;

  const fetchPayments = () => {
    fetch(`${API_BASE}/payments`)
      .then((res) => res.json())
      .then((data: Payment[]) => setPayments(data))
      .catch((err) => console.log(err));
  };

  useEffect(fetchPayments, []);

  return (
    <div className="flex flex-col">
      <div className="flex p-5">
        <SearchBar searchName={paid_for_period} searchingChange={setPeriod} />
        <div className="flex"></div>
        <div className="flex flex-1"></div>
        <AddStudentButton
          onClick={() => setPaymentOpen(!open)}
          message="Add Payment"
        />
      </div>
      {open && (
        <AddPayment
          onSubmit={fetchPayments}
          onClick={() => setPaymentOpen(false)}
        />
      )}
      <Table
        data={payments}
        getKey={(p) => p.payment_id}
        columns={[
          { header: "Payment ID", render: (p) => p.payment_id },
          { header: "Student ID", render: (p) => p.student_id },
          { header: "Student", render: (p) => p.student },
          { header: "Payment Period", render: (p) => p.paid_for_period },
          { header: "Amount (MMK)", render: (p) => p.amount },
          { header: "Status", render: (p) => p.status },
          { header: "Payment Date", render: (p) => p.payment_date },
        ]}
      />{" "}
    </div>
  );
}
