import { gradeMap } from "./GradeMap.ts";
import { useState } from "react";
import filter from "./assets/images/filter.png";

type FilterProps = {
  selectedGrades: string[];
  setSelectedGrades: (grade: string[]) => void;
};

export function Filter({ selectedGrades, setSelectedGrades }: FilterProps) {
  const [open, setOpen] = useState(false);

  const filterGrades = (grade: string) => {
    if (selectedGrades.includes(grade)) {
      setSelectedGrades(
        selectedGrades.filter((selectedGrade) => selectedGrade !== grade)
      );
    } else {
      setSelectedGrades([...selectedGrades, grade]);
    }
  };

  return (
    <div className="w-40 flex items-center justify-center border-2 mx-20 rounded-4xl">
      <button
        className="w-40 flex justify-center items-center"
        onClick={() => setOpen(!open)}
      >
        Filter Grades
        <img src={filter} alt="filter" className="w-5 ml-4"></img>
      </button>

      <div
        className={`absolute w-50 h-100 bg-gray-600 z-15 top-30 flex flex-col items-center justify-center transform transition-all duration-300 ease-out
      ${
        open
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-3 scale-95"
      }`}
      >
        {Object.entries(gradeMap).map(([key, value]) => {
          const checked = selectedGrades.includes(key);

          return (
            <label key={key}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => filterGrades(key)}
              />
              <span className="text-lg px-3">{value}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
