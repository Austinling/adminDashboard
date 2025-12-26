import { useState, useEffect } from "react";
import { gradeMap } from "./GradeMap.ts";

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  getKey: (row: T) => number;
  selectedKeys?: number[];
};

type Column<T> = {
  header: string;
  render: (row: T) => React.ReactNode;
};

export function Table<T>({
  data,
  columns,
  getKey,
  selectedKeys,
}: TableProps<T>) {
  return (
    <>
      <div className="overflow-auto max-h-130">
        <table className="bg-white w-full table-fixed ">
          <thead className="sticky top-0 z-10 bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)]">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={`w-1/${columns.length} px-4 py-6`}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((dataPoint) => {
              return (
                <tr
                  key={getKey(dataPoint)}
                  className={`w-full transition-colors duration-150 ${
                    selectedKeys?.includes(getKey(dataPoint))
                      ? "bg-gray-200"
                      : ""
                  }`}
                >
                  {columns.map((column, index) => (
                    <td key={index} className="px-4 py-3 text-center">
                      {column.render(dataPoint)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
