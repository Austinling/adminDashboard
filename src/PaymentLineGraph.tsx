import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import type { Payment } from "./PaymentType";

const numberToMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type PaymentLineGraphProp = {
  payments: Payment[];
  mode: string;
};

export function PaymentLineGraph({ payments, mode }: PaymentLineGraphProp) {
  const count: Record<string, number> = Object.fromEntries(
    numberToMonth.map((month) => {
      return [month, 0];
    }),
  );

  payments.forEach((payment) => {
    const month = parseInt(payment.payment_date.split("-")[1]) - 1;
    const nameOfMonth = numberToMonth[month];

    const number = mode === "Tuition Fee" ? parseInt(payment.amount) : 1;

    count[nameOfMonth] += number;
  });

  const monthObject = numberToMonth.map((month) => ({
    name: month,
    value: count[month],
  }));

  return (
    <LineChart
      style={{
        width: "100%",
        maxWidth: "700px",
        height: "100%",
        maxHeight: "70vh",
        aspectRatio: 1,
      }}
      responsive
      data={monthObject}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" angle={-45} textAnchor="end" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <RechartsDevtools />
    </LineChart>
  );
}
