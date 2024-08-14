import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import lottieLogo from "../assets/Logo.json";
import defaultAvatar from "../assets/default.jpg";
import useAuth from "../Hooks/useAuth";
import { FaArrowRightToBracket } from "react-icons/fa6";
import useMyCart from "../Hooks/useMyCart";
import useAdmin from "../Hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { isAdmin } = useAdmin();
  const { totalCart, myBookings } = useMyCart();
  const [myProgress, setMyProgress] = useState(null);
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const userRef = useRef(null);

  const location = useLocation();
  const getLinkClasses = (path) => {
    return location.pathname === path ? "bg-green-400 text-white" : "";
  };

  const handleLogout = () => {
    logOut().then().catch();
  };

  useEffect(() => {
    if (totalCart > 0) {
      const findProgress = myBookings?.find(
        (booking) => booking.status === "Progress"
      );
      setMyProgress(findProgress);
    }
  }, [totalCart, myBookings]);

  const date = new Date();
  const currentTime = date.getHours();

  let greeting;
  if (currentTime >= 4 && currentTime < 6) {
    greeting = "Whoa, early bird";
  } else if (currentTime >= 6 && currentTime < 12) {
    greeting = "Good morning";
  } else if (currentTime >= 12 && currentTime < 16) {
    greeting = "Good afternoon";
  } else if (currentTime >= 16 && currentTime < 20) {
    greeting = "Good evening";
  } else if (currentTime >= 20 && currentTime < 24) {
    greeting = "Good night";
  } else if (currentTime >= 24 || currentTime < 1) {
    greeting = "Sleep tight";
  } else if (currentTime >= 1 && currentTime < 4) {
    greeting = "Working late?";
  }

  // Handle click outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar min-h-[58px] bg-base-100 rounded-lg md:px-4 py-0">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-1"
          >
            <Link
              to="/"
              className={`font-semibold flex items-center ${
                location.pathname === "/" ? "text-green-500" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/all-books"
              className={`font-semibold flex items-center ${
                location.pathname === "/all-books" ? "text-green-500" : ""
              }`}
            >
              All Books
            </Link>
            {user && (
              <>
                <Link
                  to="/add-book"
                  className={`font-semibold flex items-center ${
                    location.pathname === "/add-book" ? "text-green-500" : ""
                  }`}
                >
                  Add Book
                </Link>
                <Link
                  to="/my-books"
                  className={`font-semibold flex items-center ${
                    location.pathname === "/my-books" ? "text-green-500" : ""
                  }`}
                >
                  My Books
                </Link>
                <Link
                  to="/my-schedules"
                  className={`font-semibold flex items-center ${
                    location.pathname === "/my-schedules"
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  My Schedule
                </Link>
              </>
            )}
            {isAdmin && (
              <Link
                to="/admin-dashboard"
                className={`font-semibold flex items-center ${
                  location.pathname === "/admin-dashboard"
                    ? "text-green-500"
                    : ""
                }`}
              >
                Dashboard
              </Link>
            )}
          </ul>
        </div>
        <Link to={"/"}>
          <div className="flex items-center gap-1">
            <Lottie className="w-0 md:w-[52px]" animationData={lottieLogo} />
            <span className="md:ml-1 font-bold text-[17px] md:text-[21px]">
              MBSTU BookHaven
            </span>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-1">
          <Link
            to="/"
            className={`text-base font-semibold flex items-center px-[10px] py-1 rounded-full ${getLinkClasses(
              "/"
            )}`}
          >
            Home
          </Link>
          <Link
            to="/all-books"
            className={`text-base font-semibold flex items-center px-[10px] py-1 rounded-full ${getLinkClasses(
              "/all-books"
            )}`}
          >
            All Books
          </Link>
          {user && (
            <>
              <Link
                to="/add-book"
                className={`text-base font-semibold flex items-center px-[10px] py-1 rounded-full ${getLinkClasses(
                  "/add-book"
                )}`}
              >
                Add Book
              </Link>
              <Link
                to="/my-books"
                className={`text-base font-semibold flex items-center px-[10px] py-1 rounded-full ${getLinkClasses(
                  "/my-books"
                )}`}
              >
                My Books
              </Link>
              <Link
                to="/my-schedules"
                className={`text-base font-semibold flex items-center px-[10px] py-1 rounded-full ${getLinkClasses(
                  "/my-schedules"
                )}`}
              >
                My Schedule
              </Link>
            </>
          )}
          {isAdmin && (
            <Link
              to="/admin-dashboard"
              className={`text-base font-semibold flex items-center px-[10px] py-1 rounded-full ${getLinkClasses(
                "/admin-dashboard"
              )}`}
            >
              Dashboard
            </Link>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {user && (
          <Link to="/my-schedules">
            <div
              tabIndex={0}
              role="button"
              className={`${
                myProgress ? "animate-bounce" : ""
              } btn btn-ghost btn-circle`}
              style={{
                animationIterationCount: myProgress ? "4" : "initial",
              }}
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span
                  className={`${
                    myProgress ? "bg-green-400 text-white" : ""
                  } badge badge-sm indicator-item`}
                >
                  {totalCart || 0}
                </span>
              </div>
            </div>
          </Link>
        )}
        <div className="flex flex-col items-center justify-center font-semibold text-center text-sm mr-2 md:mx-2">
          <p className="uppercase">{greeting}</p>
          {user && <p className="hidden md:block">{user.displayName}</p>}
        </div>
        {user?.email ? (
          <div ref={userRef} className="dropdown dropdown-end">
            <label
              tabIndex={0}
              onClick={() => setUserDropdownVisible((prev) => !prev)}
            >
              <img
                src={user.photoURL || defaultAvatar}
                className="w-10 rounded-full"
                alt="ava"
              />
            </label>
            {userDropdownVisible && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
              >
                <Link
                  to="/user-analytics"
                  className={`text-base font-semibold flex justify-center items-center px-[10px] py-[3px] rounded-xl ${getLinkClasses(
                    "/user-analytics"
                  )}`}
                >
                  User Analytics
                </Link>
                <Link
                  to="/my-profile"
                  className={`text-base font-semibold flex justify-center items-center px-[10px] py-[3px] rounded-xl ${getLinkClasses(
                    "/my-profile"
                  )}`}
                >
                  View Profile
                </Link>
                <button
                  className="text-base font-semibold flex justify-center items-center px-[10px] py-1 rounded-full gap-1"
                  onClick={handleLogout}
                >
                  Logout <FaArrowRightToBracket />
                </button>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-sm border border-green-400 hover:border-green-400 hover:bg-green-400 hover:text-white">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
