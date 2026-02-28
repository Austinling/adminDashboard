import { Pie, PieChart, Sector, Legend } from "recharts";
import type { PieLabelRenderProps, PieSectorShapeProps } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import type { Student } from "../types/StudentType";

const RADIAN = Math.PI / 180;
const GRADE_COLORS: Record<string, string> = {
  幼一: "#FFD3E2", // Soft Rose
  幼二: "#FFF3BF", // Pale Sun
  幼三: "#D0EBFF", // Sky Mist
  幼四: "#E5DBFF", // Lavender Cloud
  "一年级（上）": "#FF6B6B", // Light Red
  "一年级（下）": "#FF922B", // Orange
  "二年级（上）": "#FCC419", // Yellow
  "二年级（下）": "#82C91E", // Lime
  "三年级（上）": "#20C997", // Teal
  "三年级（下）": "#339AF0", // Blue
  "四年级（上）": "#51CF66", // Green
  "四年级（下）": "#748FFC", // Indigo
  "五年级（上）": "#845EF7", // Violet
  "五年级（下）": "#BE4BDB", // Grape
  "六年级（上）": "#F06595", // Pink
  "六年级（下）": "#ADB5BD", // Slate Gray
};

const colors = Object.values(GRADE_COLORS);

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  value,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={"middle"}
      dominantBaseline="central"
      fontSize={"12px"}
    >
      {`${value} (${((percent ?? 1) * 100).toFixed(0)}%)`}
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  const actualIndex = props.index;

  const fillColor = colors[actualIndex % colors.length] || "#8884d8";

  return <Sector {...props} fill={fillColor} />;
};

type StudentGrades = {
  isAnimationActive?: boolean;
  students: Student[];
  mode: string;
};

const renderColorfulLegendText = (value: string, entry: any) => {
  const { color } = entry;

  return (
    <span style={{ color }}>
      {value} {entry.payload.value}
    </span>
  );
};

export function StudentGradePieChart({
  isAnimationActive = true,
  students,
  mode,
}: StudentGrades) {
  const data = students.reduce(
    (acc, value) => {
      let valueToFind;

      if (mode === "Grade") {
        valueToFind = value.grade;
      } else if (mode === "Class Date") {
        valueToFind = value.classDate;
      } else {
        valueToFind = value.timePeriod;
      }

      const doesGradeExist = acc.find(
        (student) => student.name === valueToFind,
      );

      if (doesGradeExist) {
        doesGradeExist.value++;
      } else {
        acc.push({
          name: valueToFind,
          value: 1,
          fill: colors[acc.length % colors.length] || "#8884d8",
        });
      }

      return acc;
    },
    [] as { name: string; value: number; fill: string }[],
  );

  const correctOrder = Object.keys(GRADE_COLORS);

  const sortedData = [...data].sort((a, b) => {
    return correctOrder.indexOf(a.name) - correctOrder.indexOf(b.name);
  });

  return (
    <PieChart
      style={{
        width: "100%",
        maxWidth: "800px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={mode === "Grade" ? sortedData : data}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        isAnimationActive={isAnimationActive}
        shape={MyCustomPie}
      ></Pie>
      <Legend
        verticalAlign="top"
        align="right"
        height={56}
        layout="vertical"
        formatter={renderColorfulLegendText}
        itemSorter={"dataKey"}
      />

      <RechartsDevtools />
    </PieChart>
  );
}
