import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import {
  FaBook,
  FaHome,
  FaClipboardList,
  FaUsers,
  FaUserCog,
} from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import logo from "../assets/Favicon.png";
import useAuth from "../Hooks/useAuth";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const { user, logOut } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleLogout = () => {
    logOut().catch(() => {});
  };

  const SidebarLink = ({ to, icon, label, currentPath }) => (
    <Link to={to}>
      <button
        className={`flex items-center w-full px-4 py-3 text-gray-700 transition-colors duration-200 transform rounded-lg hover:bg-gray-200 hover:text-gray-900 ${
          currentPath === to ? "bg-gray-200 text-gray-900 font-semibold" : ""
        }`}
      >
        <div className="text-xl mr-4">{icon}</div>
        <span className="font-medium">{label}</span>
      </button>
    </Link>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        isActive
      ) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  return (
    <div>
      <div className="bg-white text-gray-800 flex justify-between md:hidden shadow-sm">
        <Link to="/" className="block cursor-pointer px-5 py-2">
          <img src={logo} className="w-12 h-12" alt="Logo" />
        </Link>
        <button
          ref={buttonRef}
          onClick={handleToggle}
          className="p-4 focus:outline-none focus:bg-gray-200 rounded"
        >
          <AiOutlineBars className="h-6 w-7" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`z-50 md:fixed flex flex-col justify-between overflow-x-hidden bg-white w-64 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out shadow-xl`}
      >
        <div>
          <Link to="/" className="hidden md:block">
            <div className="w-full hidden md:flex p-2 shadow-sm rounded-xl justify-center items-center bg-gray-100">
              <img src={logo} className="h-14 w-14" alt="Logo" />
            </div>
          </Link>
          {user && (
            <div className="flex items-center px-4 my-6 text-gray-800">
              <span className="font-semibold text-lg">
                Hi, {user?.displayName || "Admin"}
              </span>
            </div>
          )}
          <nav className="space-y-2">
            <SidebarLink
              to="/admin-dashboard"
              icon={<FaHome />}
              label="Dashboard"
              currentPath={currentPath}
            />
            <SidebarLink
              to="/admin-dashboard/all-books"
              icon={<FaBook />}
              label="All Books"
              currentPath={currentPath}
            />
            <SidebarLink
              to="/admin-dashboard/all-bookings"
              icon={<FaClipboardList />}
              label="All Bookings"
              currentPath={currentPath}
            />
            <SidebarLink
              to="/admin-dashboard/all-users"
              icon={<FaUsers />}
              label="All Users"
              currentPath={currentPath}
            />
            <SidebarLink
              to="/admin-dashboard/books-providers"
              icon={<FaUserCog />}
              label="Books Providers"
              currentPath={currentPath}
            />
          </nav>
        </div>
        <div>
          <hr className="my-4" />
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 transform rounded-lg"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-3 font-semibold">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
