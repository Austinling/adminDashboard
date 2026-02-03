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
import { ContainerContext } from "./Authorization.tsx";
import { Dashboard } from "./Dashboard.tsx";

import "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContainerContext>
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
              <Route path="/dashboard" element={<Dashboard />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContainerContext>
  </StrictMode>,
);
