import { Table } from "./Table.tsx";
import type { Student } from "./StudentType.ts";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar.tsx";

export function FullDataBox() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchName, setSearch] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    fetch(`${API_BASE}/students`)
      .then((res) => res.json())
      .then((data: Student[]) => setStudents(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <div className="flex p-5">
        <SearchBar searchName={searchName} searchingChange={setSearch} />
      </div>

      <Table students={filteredStudents} />
    </div>
  );
}
