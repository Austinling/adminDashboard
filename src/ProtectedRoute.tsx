import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./Authorization";

export function ProtectedRoute() {
  const token = useContext(UserContext);

  const navigate = useNavigate();

  if (token === undefined) {
    return <Navigate to="/login" replace />;
  }

  if (token.role === null) {
    return <Navigate to="/login" replace />;
  }

  const isTokenExpired = () => {
    const actualToken = localStorage.getItem("token");

    if (!actualToken) return true;

    try {
      const parts = actualToken?.split(".");
      const actualPayload = JSON.parse(atob(parts[1]));
      const expirationTime = actualPayload.exp * 1000;
      return Date.now() > expirationTime;

      actualPayload;
    } catch {
      return true;
    }
  };

  useEffect(() => {
    if (isTokenExpired()) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);

  return <Outlet />;
}
