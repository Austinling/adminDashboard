import { gradeMap } from "./GradeMap.ts";
import { useState } from "react";

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
    <div className="w-20 border-2">
      <button className="w-20" onClick={() => setOpen(!open)}>
        Filter Grades
      </button>

      {open && (
        <div className="absolute w-50 h-50">
          {Object.entries(gradeMap).map(([key, value]) => {
            const checked = selectedGrades.includes(key);

            return (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => filterGrades(key)}
                />
                <span>{value}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
