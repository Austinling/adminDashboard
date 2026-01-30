import { Pie, PieChart, Sector, LabelList } from "recharts";
import type { PieLabelRenderProps, PieSectorShapeProps } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import type { Student } from "./StudentType";

// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
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
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

type StudentGrades = {
  isAnimationActive?: boolean;
  students: Student[];
};

export function StudentGradePieChart({
  isAnimationActive = true,
  students,
}: StudentGrades) {
  const data = students.reduce(
    (acc, value) => {
      const doesGradeExist = acc.find(
        (student) => student.name === value.grade,
      );

      if (doesGradeExist) {
        doesGradeExist.value++;
      } else {
        acc.push({ name: value.grade, value: 1 });
      }

      return acc;
    },
    [] as { name: string; value: number }[],
  );

  return (
    <PieChart
      style={{
        width: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        isAnimationActive={isAnimationActive}
        shape={MyCustomPie}
      >
        <LabelList
          dataKey="name"
          position="outside"
          fill="black"
          style={{ fontWeight: "bold" }}
        />
      </Pie>
      <RechartsDevtools />
    </PieChart>
  );
}
