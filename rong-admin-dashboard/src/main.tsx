import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navbar } from "./Navbar.tsx";
import { Table } from "./Table.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex h-screen">
      <Navbar />
      <Table />
    </div>
  </StrictMode>
);
