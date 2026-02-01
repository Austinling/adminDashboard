import type { Payment } from "./PaymentType";
import {
  BarChart,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

type PaymentStatusGraphProp = {
  payments: Payment[];
};

export function PaymentStatusGraph({ payments }: PaymentStatusGraphProp) {
  const paymentData = payments.reduce(
    (acc, value) => {
      if (value.status === "Paid") {
        acc.paid++;
      } else {
        acc.unpaid++;
      }

      return acc;
    },
    { paid: 0, unpaid: 0 },
  );

  const data = [
    {
      name: "Payments",
      Paid: paymentData.paid,
      Unpaid: paymentData.unpaid,
    },
  ];

  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1,
      }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="Paid" stackId="a" fill="#8884d8" background />
      <Bar dataKey="Unpaid" stackId="a" fill="#82ca9d" background />
      <RechartsDevtools />
    </BarChart>
  );
}
