import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentsPage } from "./students/StudentsPage.tsx";
import { PaymentsPage } from "./payments/PaymentsPage.tsx";
import { Layout } from "./layout/Layout.tsx";
import { LoginLayout } from "./layout/LoginLayout.tsx";
import { Login } from "./layout/Login.tsx";
import "./index.css";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./layout/ProtectedRoute.tsx";
import { ContainerContext } from "./layout/Authorization.tsx";
import { Dashboard } from "./layout/Dashboard.tsx";

import "./i18n.ts";

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
              <Route path="/payments" element={<PaymentsPage />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContainerContext>
  </StrictMode>,
);
