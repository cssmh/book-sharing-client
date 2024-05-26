import { useState } from "react";
import Lottie from "lottie-react";
import loggieData from "../../assets/Logo.json";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Shared/useCustomHook/useAuth";
import useMyCart from "../../Shared/useCustomHook/useMyCart";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const { myBookings } = useMyCart();

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleLogout = () => {
    logOut().then().catch();
  };

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

  return (
    <div className="navbar bg-base-200 rounded-lg mb-1 md:px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
            <Lottie className="w-0 md:w-14" animationData={loggieData} />
            <span className="md:ml-1 font-bold text-lg md:text-2xl">
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
          <div className="dropdown dropdown-end">
            <Link to="/my-schedules">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
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
                  <span className="badge badge-sm indicator-item">
                    {myBookings?.length}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}
        {/* cart btn */}
        <div className="flex flex-col items-center justify-center text-center font-semibold text-sm md:btn pointer-events-none mr-1 md:mr-0">
          {user ? (
            <>
              <p>{greeting}</p>
              <p>{user?.displayName}</p>
            </>
          ) : (
            <p>{greeting}</p>
          )}
        </div>
        {user?.email ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              onClick={handleProfileClick}
            >
              <div className="w-12 rounded-full">
                <img src={user?.photoURL} alt={user?.displayName} />
              </div>
            </label>
            {showProfileOptions && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <p className="btn pointer-events-none btn-sm btn-ghost">
                    {user?.displayName?.length > 16
                      ? user.displayName.slice(0, 17)
                      : user.displayName}
                  </p>
                  <button className="btn btn-sm btn-ghost">
                    <Link to={"/my-profile"}>View Profile</Link>
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={handleLogout}
                  >
                    Logout
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
