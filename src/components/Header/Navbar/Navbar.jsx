import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../AuthProviders/AuthProviders";
import Logo from "../../../assets/logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleSignOut = () => {
    logOut().then().catch();
  };

  return (
    <div className="navbar bg-gray-200 rounded-lg mb-1 md:px-4">
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
            {user && (
              <li>
                <a className="font-semibold text-base">Dashboard</a>
                <ul className="p-2">
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
              </li>
            )}
          </ul>
        </div>
        <Link to={"/"}>
          <div className="flex items-center gap-1">
            <img className="w-0 md:w-12 rounded-3xl" src={Logo} alt="" />
            <span className="md:ml-2 font-bold text-lg md:text-2xl">
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
        {user?.email ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-12 rounded-full">
                <img src={user?.photoURL} alt={user?.displayName} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button className="btn btn-sm btn-ghost">
                  <Link to={"/profile"}>{user?.displayName}</Link>
                </button>
              </li>
              <li>
                <button
                  className="btn btn-sm  btn-ghost"
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </li>
            </ul>
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
