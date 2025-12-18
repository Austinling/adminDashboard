import rongLogo from "./assets/images/rongbg.png";

export function Navbar() {
  return (
    <div className="bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)] w-full h-20 border-b-2 border-black flex justify-evenly items-center">
      <a href="" className="text-outline">
        Payments
      </a>
      <img src={rongLogo} alt="Logo" className="w-20 p-3"></img>
      <a href="" className="text-outline">
        Attendance
      </a>
    </div>
  );
}
