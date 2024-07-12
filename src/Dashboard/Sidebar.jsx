import { useState } from "react";
import { Link } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import {
  FaHome,
  FaBook,
  FaClipboardList,
  FaUsers,
  FaAddressBook,
  FaRegCalendarAlt,
} from "react-icons/fa";
import logo from "../assets/Favicon.png";
import useAuth from "../Hooks/useAuth";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const { user, logOut } = useAuth();
  const admin = user?.email === "admin@admin.com";

  const handleLogout = () => {
    logOut().then().catch();
  };

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      <div className="bg-base-200 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer px-5 py-2 font-bold">
            <Link to="/">
              <img src={logo} className="w-12" alt="Logo" />
            </Link>
          </div>
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-6 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <Link to="/" className="hidden md:block">
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto">
              <img src={logo} className="h-14" alt="Logo" />
            </div>
          </Link>
          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="space-y-2">
              <Link to="/dashboard">
                <button className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform">
                  <FaHome className="w-5 h-5" />
                  <span className="mx-4 font-medium">Dashboard</span>
                </button>
              </Link>
              {user && (
                <>
                  <Link to="/dashboard/my-books">
                    <button className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform">
                      <FaAddressBook  className="w-5 h-5" />
                      <span className="mx-4 font-medium">My Books</span>
                    </button>
                  </Link>
                  <Link to="/dashboard/my-schedules">
                    <button className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform">
                      <FaRegCalendarAlt  className="w-5 h-5" />
                      <span className="mx-4 font-medium">My Schedule</span>
                    </button>
                  </Link>
                </>
              )}
              {admin && (
                <>
                  <Link to="/dashboard/all-books">
                    <button className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform">
                      <FaBook className="w-5 h-5" />
                      <span className="mx-4 font-medium">All Books</span>
                    </button>
                  </Link>
                  <Link to="/dashboard/all-bookings">
                    <button className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform">
                      <FaClipboardList className="w-5 h-5" />
                      <span className="mx-4 font-medium">All Bookings</span>
                    </button>
                  </Link>
                  <Link to="/dashboard/books-providers">
                    <button className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform">
                      <FaUsers className="w-5 h-5" />
                      <span className="mx-4 font-medium">Books Providers</span>
                    </button>
                  </Link>
                  <Link to="/dashboard/users-to-update">
                    <button className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform">
                      <FcSettings className="w-5 h-5" />
                      <span className="mx-4 font-medium">Users to Update</span>
                    </button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
        <div>
          <hr />
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
