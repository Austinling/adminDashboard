import { gradeMap } from "./GradeMap.ts";
import { useState } from "react";
import filter from "./assets/images/filter.png";
import { timePeriodArray } from "./TimePeriod.ts";
import { classDateArray } from "./ClassDate.ts";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

type FilterProps = {
  selectedGrades: string[];
  setSelectedGrades: (grade: string[]) => void;
  selectedTimePeriods: string[];
  setSelectedTimePeriods: (timePeriod: string[]) => void;
  selectedClassDates: string[];
  setSelectedClassDates: (classDate: string[]) => void;
};

export function Filter({
  selectedGrades,
  setSelectedGrades,
  selectedTimePeriods,
  setSelectedTimePeriods,
  selectedClassDates,
  setSelectedClassDates,
}: FilterProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const filterGrades = (grade: string) => {
    if (selectedGrades.includes(grade) && open) {
      setSelectedGrades(
        selectedGrades.filter((selectedGrade) => selectedGrade !== grade),
      );
    } else {
      open && setSelectedGrades([...selectedGrades, grade]);
    }
  };

  const filteredSelectedTimePeriods = (timePeriod: string) => {
    if (selectedTimePeriods.includes(timePeriod) && open) {
      setSelectedTimePeriods(
        selectedTimePeriods.filter(
          (actualTimePeriod) => actualTimePeriod != timePeriod,
        ),
      );
    } else {
      open && setSelectedTimePeriods([...selectedTimePeriods, timePeriod]);
    }
  };

  const filteredSelectedClassDate = (classDate: string) => {
    if (selectedClassDates.includes(classDate) && open) {
      setSelectedClassDates(
        selectedClassDates.filter((actualDate) => actualDate != classDate),
      );
    } else {
      open && setSelectedClassDates([...selectedClassDates, classDate]);
    }
  };

  return (
    <div className="relative w-30 flex items-center justify-center border-2 border-gray-400 ml-5 rounded-4xl">
      <button
        className="w-30 flex justify-center items-center text-gray-500 cursor-pointer relative z-10"
        onClick={() => setOpen(!open)}
      >
        {t("Filter")}
        <img src={filter} alt="filter" className="w-5 ml-4"></img>
      </button>

      <div
        className={`absolute w-100 h-150 bg-white border-2 top-10 flex flex-col items-center justify-center transform transition-all duration-300 ease-out z-50
      ${
        open
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 -translate-y-3 scale-95 pointer-events-none"
      }`}
      >
        <X
          className="absolute right-0 top-0 mr-3 mt-3 cursor-pointer hover:scale-110"
          onClick={() => setOpen(false)}
        />
        <div className="flex flex-col gap-3">
          <h2 className="w-full text-center">{t("Grade")}</h2>
          <div className="grid grid-cols-3 gap-4 p-4">
            {Object.entries(gradeMap).map(([key, value]) => {
              const checked = selectedGrades.includes(value);
              return (
                <label key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => filterGrades(value)}
                    className="border-2"
                  />
                  <span className="text-sm">{value}</span>
                </label>
              );
            })}
          </div>
          <h2 className="border-b-2 w-full text-center">{t("Time_Period")}</h2>
          <div className="grid grid-cols-3 gap-4 p-4">
            {timePeriodArray.map((value) => {
              const timePeriodChecked = selectedTimePeriods?.includes(value);
              return (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={timePeriodChecked}
                    onChange={() => filteredSelectedTimePeriods(value)}
                    className="border-2"
                  />
                  <span className="text-sm">{value}</span>
                </label>
              );
            })}
          </div>
          <h2 className="border-b-2 w-full text-center">{t("Class_Date")}</h2>
          <div className="grid grid-cols-3 gap-4 p-4">
            {classDateArray.map((value) => {
              const classDateChecked = selectedClassDates?.includes(value);
              return (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={classDateChecked}
                    onChange={() => filteredSelectedClassDate(value)}
                    className="border-2"
                  />
                  <span className="text-sm">{value}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
