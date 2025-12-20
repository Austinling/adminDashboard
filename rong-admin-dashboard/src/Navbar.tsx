import rongLogo from "./assets/images/rongbg.png";
import cash from "./assets/images/cash.png";
import user from "./assets/images/user.png";
import loggedInUser from "./assets/images/loggedIn.png";

export function Navbar() {
  return (
    <div className="bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)] w-50 h-full border-r-2 border-black flex flex-col justify-around items-center gap-6 px-4">
      <img src={rongLogo} alt="Logo" className="w-20 p-3 mt-10"></img>

      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex items-center">
          <img src={cash} alt="Cash" className="w-15 p-3"></img>
          <a href="" className="text-outline">
            Payments
          </a>
        </div>

        <div className="flex items-center">
          <img src={user} alt="User" className="w-15 p-3"></img>
          <a href="" className="text-outline">
            Attendance
          </a>
        </div>
      </div>

      <div className="flex items-center">
        <img src={loggedInUser} alt="User" className="w-15 p-3"></img>
        <a href="" className="">
          Austin
        </a>
      </div>
    </div>
  );
}
