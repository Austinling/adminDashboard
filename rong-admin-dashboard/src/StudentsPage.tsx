import { Table } from "./Table.tsx";
import type { Student } from "./StudentType.ts";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar.tsx";
import { Filter } from "./Filter.tsx";
import { AddStudentButton } from "./AddStudentButton.tsx";
import { AddStudentForm } from "./AddStudentForm.tsx";

export function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchName, setSearch] = useState("");
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [addOpen, setAddOpen] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE;

  const fetchStudents = () => {
    fetch(`${API_BASE}/students`)
      .then((res) => res.json())
      .then((data: Student[]) => setStudents(data))
      .catch((err) => console.log(err));
  };

  useEffect(fetchStudents, []);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (selectedGrades.length === 0 || selectedGrades.includes(student.grade))
  );

  console.log(selectedGrades);

  return (
    <div className="flex flex-col">
      <div className="flex p-5">
        <SearchBar searchName={searchName} searchingChange={setSearch} />
        <div className="flex">
          <Filter
            selectedGrades={selectedGrades}
            setSelectedGrades={setSelectedGrades}
          />
        </div>
        <div className="flex flex-1"></div>
        <AddStudentButton
          onClick={() => setAddOpen(!addOpen)}
          message="Add Button"
        />
      </div>
      {addOpen && (
        <AddStudentForm
          onSubmit={fetchStudents}
          onClick={() => setAddOpen(false)}
        />
      )}

      <Table
        data={filteredStudents}
        getKey={(s) => s.student_id}
        columns={[
          { header: "Student ID", render: (s) => s.student_id },
          { header: "Name", render: (s) => s.name },
          { header: "Phone Number", render: (s) => s.phoneNumber },
          { header: "Grade", render: (s) => s.grade },
        ]}
      />
    </div>
  );
}
