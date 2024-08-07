import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import logo from "../assets/Favicon.png";
import useAuth from "../Hooks/useAuth";
import { AiOutlineBars } from "react-icons/ai";
import { FaHome, FaBook, FaClipboardList, FaUsers } from "react-icons/fa";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const { user, logOut } = useAuth();
  const admin = user?.email === "admin@admin.com";
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    logOut().then().catch();
  };

  const linkClasses = (path) =>
    `flex items-center w-full px-4 py-2 text-gray-600 transition-colors duration-300 transform ${
      currentPath === path && "bg-gray-300"
    }`;

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
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
          ref={buttonRef}
          onClick={() => setActive(!isActive)}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-6 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
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
                <button className={linkClasses("/dashboard")}>
                  <FaHome className="w-5 h-5" />
                  <span className="mx-4 font-medium">Dashboard</span>
                </button>
              </Link>
              {admin && (
                <>
                  <Link to="/dashboard/all-books">
                    <button className={linkClasses("/dashboard/all-books")}>
                      <FaBook className="w-5 h-5" />
                      <span className="mx-4 font-medium">All Books</span>
                    </button>
                  </Link>
                  <Link to="/dashboard/all-bookings">
                    <button className={linkClasses("/dashboard/all-bookings")}>
                      <FaClipboardList className="w-5 h-5" />
                      <span className="mx-4 font-medium">All Bookings</span>
                    </button>
                  </Link>
                  <Link to="/dashboard/books-providers">
                    <button
                      className={linkClasses("/dashboard/books-providers")}
                    >
                      <FaUsers className="w-5 h-5" />
                      <span className="mx-4 font-medium">Books Providers</span>
                    </button>
                  </Link>
                  <Link to="/dashboard/users-to-update">
                    <button
                      className={linkClasses("/dashboard/users-to-update")}
                    >
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
