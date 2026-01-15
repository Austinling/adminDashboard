import { Navbar } from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";

export function Layout() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Navbar
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white h-150 w-300 border-0 shadow-lg rounded-xl ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
