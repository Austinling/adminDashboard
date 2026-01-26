import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./Authorization";

export function ProtectedRoute() {
  const token = useContext(UserContext);

  if (token === undefined) {
    return <Navigate to="/login" replace />;
  }

  if (token.role === null) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
