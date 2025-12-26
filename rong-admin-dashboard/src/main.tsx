import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentsPage } from "./StudentsPage.tsx";
import { TeachersPage } from "./TeachersPage.tsx";
import { PaymentsPage } from "./PaymentsPage.tsx";
import { Layout } from "./Layout.tsx";
import { LoginLayout } from "./LoginLayout.tsx";
import { Login } from "./Login.tsx";
import "./index.css";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />}></Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/students" element={<StudentsPage />}></Route>
            <Route path="/teachers" element={<TeachersPage />}></Route>
            <Route path="/payments" element={<PaymentsPage />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
