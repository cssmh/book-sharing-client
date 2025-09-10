import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import useAuth from "../Hooks/useAuth";
import defaultAvatar from "../assets/default.jpg";
import Lottie from "lottie-react";
import bookAnim from "../assets/Logo.json";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/all-books", label: "All Books" },
    { path: "/add-book", label: "Add Book" },
    { path: "/my-books", label: "My Books" },
    { path: "/my-schedules", label: "My Schedule" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container 2xl:max-w-[1370px] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Lottie animationData={bookAnim} loop={true} className="w-8 h-8" />
          <span className="text-green-600 font-bold text-lg md:text-xl">
            MBSTU BookHaven
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-medium">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`hover:text-green-500 transition ${
                  location.pathname === link.path
                    ? "text-green-500 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative group">
              <img
                src={user.photoURL || defaultAvatar}
                className="w-9 h-9 rounded-full border cursor-pointer"
                alt="avatar"
              />
              <ul className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg hidden group-hover:block">
                <Link
                  to="/my-profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </Link>
                <button
                  onClick={logOut}
                  className="flex w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-600 dark:text-gray-300"
          >
            <FaBars size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
