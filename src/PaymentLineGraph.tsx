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
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

type PaymentLineGraphProp = {
  payments: Payment[];
  mode: string;
  range?: {
    from?: Date;
    to?: Date;
  };
};

const formatToISO = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export function PaymentLineGraph({
  payments,
  mode,
  range,
}: PaymentLineGraphProp) {
  const [rangeArray, setRangeArray] = useState<string[]>([]);
  const { t } = useTranslation();

  const numberToMonth = t("Months", { returnObjects: true }) as string[];

  useEffect(() => {
    if (!range) {
      return;
    }

    if (range.from && range.to) {
      const tempArray: string[] = [];

      const tempDate = new Date(range.from);

      while (tempDate <= range.to) {
        tempArray.push(formatToISO(tempDate));
        tempDate.setDate(tempDate.getDate() + 1);
      }

      setRangeArray(tempArray);
      return;
    }

    if (range.from && !range.to) {
      setRangeArray([formatToISO(range.from)]);
      return;
    }

    setRangeArray([]);
  }, [range?.from, range?.to]);

  const source =
    rangeArray && rangeArray.length > 0 ? rangeArray : numberToMonth;

  const count: Record<string, number> = Object.fromEntries(
    source.map((item) => {
      return [item, 0];
    }),
  );

  payments.forEach((payment) => {
    const key =
      rangeArray && rangeArray.length > 0
        ? payment.payment_date
        : source[parseInt(payment.payment_date.split("-")[1]) - 1];

    if (count.hasOwnProperty(key)) {
      const valueToAdd = mode === "Tuition_Fee" ? parseInt(payment.amount) : 1;
      count[key] += valueToAdd;
    }
  });

  const monthObject = source.map((item) => ({
    name: item,
    value: count[item],
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
        right: 50,
        left: 30,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        name={t("Total")}
      />
      <RechartsDevtools />
    </LineChart>
  );
}
