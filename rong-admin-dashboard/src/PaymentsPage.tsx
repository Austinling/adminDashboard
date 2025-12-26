import { Table } from "./Table.tsx";
import type { Payment } from "./PaymentType.ts";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar.tsx";
import { Filter } from "./Filter.tsx";
import { AddStudentButton } from "./AddStudentButton.tsx";
import { AddPayment } from "./AddPayment.tsx";
import { DeleteButton } from "./DeleteButton.tsx";

export function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchName, setSearch] = useState("");
  const [open, setPaymentOpen] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);

  const API_BASE = import.meta.env.VITE_API_BASE;

  function toggleSelect(id: number) {
    setSelectedKeys((selectedIds) =>
      selectedIds.includes(id)
        ? selectedIds.filter((filteredId) => filteredId != id)
        : [...selectedIds, id]
    );
  }

  const fetchPayments = () => {
    fetch(`${API_BASE}/payments`)
      .then((res) => res.json())
      .then((data: Payment[]) => setPayments(data))
      .catch((err) => console.log(err));
  };

  const deletePayments = async () => {
    if (selectedKeys.length === 0) return;

    await fetch(`${API_BASE}/payments`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: selectedKeys,
      }),
    });

    fetchPayments();
  };

  useEffect(fetchPayments, []);

  const filteredPayments = payments.filter((payment) =>
    payment.student?.includes(searchName)
  );

  return (
    <div className="flex flex-col">
      <div className="flex p-5">
        <SearchBar searchName={searchName} searchingChange={setSearch} />
        <div className="flex"></div>
        <div className="flex flex-1"></div>
        <div className="flex flex-row gap-3">
          <AddStudentButton
            onClick={() => setPaymentOpen(!open)}
            message="Add Payment"
          />
          <DeleteButton
            onClick={() => {
              deletePayments();
              setDelete(!isDelete);
              setSelectedKeys([]);
            }}
            isOn={isDelete}
          />
        </div>
      </div>
      {open && (
        <AddPayment
          onSubmit={fetchPayments}
          onClick={() => setPaymentOpen(false)}
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
        ]}
        selectedKeys={selectedKeys}
        toggleSelect={toggleSelect}
        isDelete={isDelete}
      />{" "}
    </div>
  );
}
