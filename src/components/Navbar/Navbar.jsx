import { Link, NavLink } from "react-router-dom";
import useContextHook from "../../useCustomHook/useContextHook";
import Lottie from "lottie-react";
import loggieData from "../../assets/Logo.json";
import { useState } from "react";

const Navbar = () => {
  const { user, logOut } = useContextHook();
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleLogout = () => {
    logOut().then().catch();
  };

  const date = new Date();
  const currentTime = date.getHours();

  let greeting;
  if (currentTime >= 6 && currentTime < 12) {
    greeting = "Good morning";
  } else if (currentTime >= 12 && currentTime < 18) {
    greeting = "Good afternoon";
  } else if (currentTime >= 18 && currentTime < 20) {
    greeting = "Good evening";
  } else {
    greeting = "Good night";
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
              <li className="font-semibold text-green-400">
                <NavLink to="/admin">Admin</NavLink>
              </li>
            )}
            {user && (
              <ul>
                <li className="font-semibold text-base">
                  <NavLink to="/my-books">My-Books</NavLink>
                </li>
                <li className="font-semibold text-base">
                  <NavLink to="/add-book">Add-Book</NavLink>
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
          {user?.email == "admin@admin.com" && (
            <li className="font-semibold text-base">
              <NavLink to="/admin">Admin</NavLink>
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
                    <NavLink to="/add-book">Add-Book</NavLink>
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
        <div className="flex flex-col items-center justify-center text-center font-semibold text-sm md:btn pointer-events-none mr-1 md:mr-0">
          {user ? (
            <>
              <p>{greeting}</p>
              <p>{user.displayName}</p>
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
              {/* active green icon on photo */}
              {/* <div className="avatar online">
                <div className="w-12 rounded-full">
                  <img
                    src={user?.photoURL}
                    style={{ boxShadow: "0 0 0 2px #4299e1" }}
                  />
                </div>
              </div> */}
            </label>
            {showProfileOptions && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <p className="btn pointer-events-none btn-sm btn-ghost">
                    {user?.displayName}
                  </p>
                  <button className="btn btn-sm btn-ghost">
                    <Link to={"/profile"}>View Profile</Link>
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
