import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentsPage } from "./StudentsPage.tsx";
import { TeachersPage } from "./TeachersPage.tsx";
import { PaymentsPage } from "./PaymentsPage.tsx";
import { Layout } from "./Layout.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<StudentsPage />}></Route>
          <Route path="/teachers" element={<TeachersPage />}></Route>
          <Route path="/payments" element={<PaymentsPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
