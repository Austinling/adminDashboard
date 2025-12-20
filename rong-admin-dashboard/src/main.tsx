import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navbar } from "./Navbar.tsx";
import { FullDataBox } from "./FullDataBox.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex h-screen bg-gray-50">
      <Navbar />
      <div className="">
        <FullDataBox />
      </div>
    </div>
  </StrictMode>
);
