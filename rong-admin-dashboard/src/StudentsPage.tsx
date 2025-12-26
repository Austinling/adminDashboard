import { Table } from "./Table.tsx";
import type { Student } from "./StudentType.ts";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar.tsx";
import { Filter } from "./Filter.tsx";
import { AddStudentButton } from "./AddStudentButton.tsx";
import { AddStudentForm } from "./AddStudentForm.tsx";
import { DeleteButton } from "./DeleteButton.tsx";

export function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchName, setSearch] = useState("");
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
  const [isDelete, setDelete] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE;

  function toggleSelect(id: number) {
    setSelectedKeys((selectedIds) =>
      selectedIds.includes(id)
        ? selectedIds.filter((filteredId) => filteredId != id)
        : [...selectedIds, id]
    );
  }

  const fetchStudents = () => {
    fetch(`${API_BASE}/students`)
      .then((res) => res.json())
      .then((data: Student[]) => setStudents(data))
      .catch((err) => console.log(err));
  };

  const deleteStudents = async () => {
    if (selectedKeys.length === 0) return;

    await fetch(`${API_BASE}/students`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: selectedKeys,
      }),
    });

    fetchStudents();
  };

  useEffect(fetchStudents, []);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (selectedGrades.length === 0 || selectedGrades.includes(student.grade))
  );

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
        <div className="flex flex-row gap-3">
          <AddStudentButton
            onClick={() => setAddOpen(!addOpen)}
            message="Add Button"
          />
          <DeleteButton
            onClick={() => {
              deleteStudents();
              setDelete(!isDelete);
              setSelectedKeys([]);
            }}
            isOn={isDelete}
          />
        </div>
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
          {
            header: "Student ID",
            render: (s) => (
              <div className="flex items-center justify-center gap-10">
                {isDelete && (
                  <input
                    type="checkbox"
                    checked={selectedKeys.includes(s.student_id)}
                    onChange={() => isDelete && toggleSelect(s.student_id)}
                    onClick={(e) => e.stopPropagation()}
                  ></input>
                )}

                <span>{s.student_id}</span>
              </div>
            ),
          },
          { header: "Name", render: (s) => s.name },
          { header: "Phone Number", render: (s) => s.phoneNumber },
          { header: "Grade", render: (s) => s.grade },
        ]}
        selectedKeys={selectedKeys}
        toggleSelect={toggleSelect}
        isDelete={isDelete}
      />
    </div>
  );
}
