import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navbar } from "./Navbar.tsx";
import { FullDataBox } from "./FullDataBox.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white h-150 w-300 border-0 shadow-lg rounded-xl ">
          <FullDataBox />
        </div>
      </div>
    </div>
  </StrictMode>
);
