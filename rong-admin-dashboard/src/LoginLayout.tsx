import { Outlet } from "react-router-dom";

export function LoginLayout() {
  return (
    <div className="flex items-center justify-center">
      <Outlet />
    </div>
  );
}
