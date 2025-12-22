import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white h-150 w-300 border-0 shadow-lg rounded-xl ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
