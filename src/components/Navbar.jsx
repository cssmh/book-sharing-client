import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import toast from "react-hot-toast";
import loggieData from "../assets/Logo.json";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FaArrowRightToBracket } from "react-icons/fa6";
import useMyCart from "../Hooks/useMyCart";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { isLoading, myBookings } = useMyCart();
  const [myProgress, setMyProgress] = useState(null);
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const userRef = useRef(null);

  const handleLogout = () => {
    logOut().then(toast.success("logout successful..")).catch();
  };

  useEffect(() => {
    if (!isLoading && myBookings?.length > 0) {
      const findProgress = myBookings.find(
        (booking) => booking.status === "Progress"
      );
      setMyProgress(findProgress);
    }
  }, [isLoading, myBookings]);

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
  // console.log(greeting);

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
    <div className="navbar bg-base-200 rounded-lg md:px-4 py-0">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li className="font-semibold text-base">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="font-semibold text-base">
              <NavLink to="/all-books">All Books</NavLink>
            </li>
            {user?.email == "admin@admin.com" && (
              <li className="font-semibold text-base">
                <NavLink to="/admin-dashboard">Admin Dashboard</NavLink>
              </li>
            )}
            {user && (
              <ul>
                <li className="font-semibold text-base">
                  <NavLink to="/add-book">Add Book</NavLink>
                </li>
                <li className="font-semibold text-base">
                  <NavLink to="/my-books">My-Books</NavLink>
                </li>
                <li className="font-semibold text-base">
                  <NavLink to="/my-schedules">My-Schedule</NavLink>
                </li>
              </ul>
            )}
          </ul>
        </div>
        <Link to={"/"}>
          <div className="flex items-center gap-1">
            <Lottie className="w-0 md:w-[52px]" animationData={loggieData} />
            <span className="md:ml-1 font-bold text-[16px] md:text-[22px]">
              MBSTU BookHaven
            </span>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="font-semibold text-base">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="font-semibold text-base">
            <NavLink to="/all-books">All Books</NavLink>
          </li>
          {user?.email && (
            <li className="font-semibold text-base">
              <NavLink to="/add-book">Add Book</NavLink>
            </li>
          )}
          {user?.email == "admin@admin.com" && (
            <li className="font-semibold text-base">
              <NavLink to="/admin-dashboard">Admin</NavLink>
            </li>
          )}
          {user && (
            <li tabIndex={0}>
              <details>
                <summary className="font-semibold text-base">Dashboard</summary>
                <ul className="p-2 menu menu-sm dropdown-content z-[1]">
                  <li className="font-semibold text-base">
                    <NavLink to="/my-books">My-Books</NavLink>
                  </li>
                  <li className="font-semibold text-base">
                    <NavLink to="/my-schedules">My-Schedule</NavLink>
                  </li>
                </ul>
              </details>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {/* cart btn */}
        {user && (
          <div className="hidden md:block">
            <Link to="/my-schedules">
              <div
                tabIndex={0}
                role="button"
                className={`${
                  myProgress && "animate-bounce"
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
                      myProgress && "bg-green-400 text-white"
                    } badge badge-sm indicator-item`}
                  >
                    {(!isLoading && myBookings.length) || 0}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}
        {/* cart btn */}
        <div className="flex flex-col items-center justify-center text-center font-semibold text-sm md:uppercase mx-[8px]">
          <p>{greeting}</p>
          {user && <p>{user?.displayName}</p>}
        </div>
        {user?.email ? (
          <div ref={userRef} className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setUserDropdownVisible((prev) => !prev)}
            >
              <div className="w-[44px] rounded-full">
                <img src={user?.photoURL} alt="User avatar" />
              </div>
            </label>
            {userDropdownVisible && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Link to="/user-analytics">
                  <li>
                    <button className="btn btn-sm btn-ghost">
                      User Analytics
                    </button>
                  </li>
                </Link>
                <Link to="/my-profile">
                  <li>
                    <button className="btn btn-sm btn-ghost">
                      View Profile
                    </button>
                  </li>
                </Link>
                <li>
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={handleLogout}
                  >
                    Logout <FaArrowRightToBracket />
                  </button>
                </li>
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
