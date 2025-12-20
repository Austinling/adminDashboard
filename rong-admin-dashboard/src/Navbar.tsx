import rongLogo from "./assets/images/rongbg.png";
import book from "./assets/images/book-keeping.png";
import user from "./assets/images/twoUser.png";
import logOut from "./assets/images/logout.png";
import group from "./assets/images/group.png";

export function Navbar() {
  return (
    <div className="bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)] w-50 h-full shadow-lg flex flex-col items-center gap-6 px-4">
      <img src={rongLogo} alt="Logo" className="w-20 p-3 mt-10"></img>

      <div className="flex flex-1 flex-col justify-center gap-2">
        <div className="flex items-center">
          <img src={user} alt="User" className="w-15 p-3"></img>
          <a href="" className="text-outline">
            Users
          </a>
        </div>

        <div className="flex items-center">
          <img src={group} alt="User" className="w-15 p-3"></img>
          <a href="" className="text-outline">
            Teachers
          </a>
        </div>

        <div className="flex items-center">
          <img src={book} alt="Cash" className="w-15 p-3"></img>
          <a href="" className="text-outline">
            Payments
          </a>
        </div>
      </div>

      <div className="flex items-center">
        <img src={logOut} alt="User" className="w-13 p-3"></img>
        <a href="" className="text-outline">
          Logout
        </a>
      </div>
    </div>
  );
}
