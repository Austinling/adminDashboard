import { Navbar } from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { useState } from "react";

export function Layout() {
  const navigate = useNavigate();
  const [headerShow, doShow] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header headerShow={() => doShow(!headerShow)} />
      <div className="flex flex-1 overflow-hidden">
        <Navbar
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          navBarShow={headerShow}
        />
        <div className="flex-1 flex items-center justify-center overflow-auto">
          <div className="bg-white h-150 w-300 border-0 shadow-lg rounded-xl ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
