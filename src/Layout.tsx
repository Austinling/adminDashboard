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
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white h-full min-w-200 max-w-300 mx-auto max-h-full border-0 shadow-lg rounded-xl overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
