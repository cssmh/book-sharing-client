// Navbar.jsx (updated with correct icon imports)
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import lottieLogo from "../assets/Logo.json";
import defaultAvatar from "../assets/default.jpg";
import useAuth from "../Hooks/useAuth";
import { FaSignOutAlt, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";
import useMyCart from "../Hooks/useMyCart";
import { motion, AnimatePresence } from "framer-motion";

const getGreeting = () => {
  const currentTime = new Date().getHours();
  if (currentTime >= 4 && currentTime < 6) return "Whoa, early bird";
  if (currentTime >= 6 && currentTime < 12) return "Good morning";
  if (currentTime >= 12 && currentTime < 16) return "Good afternoon";
  if (currentTime >= 16 && currentTime < 20) return "Good evening";
  if (currentTime >= 20 || currentTime < 1) return "Good night";
  return "Working late?";
};

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { isAdmin } = useAdmin();
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoading, totalCart, totalProgress } = useMyCart();
  const location = useLocation();
  const userRef = useRef(null);
  const menuRef = useRef(null);

  const getLinkClasses = (path) =>
    `text-base font-medium flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
      location.pathname === path
        ? "shadow-md"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  const handleLogout = async () => {
    try {
      await logOut();
      setUserDropdownVisible(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserDropdownVisible(false);
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        mobileMenuOpen
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container 2xl:max-w-[1370px] mx-auto px-4 sm:px-0">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Lottie
              className="w-10 h-10"
              animationData={lottieLogo}
              loop={true}
            />
            <span className="font-bold text-xl text-emerald-600">
              MBSTU BookHaven
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/" className={getLinkClasses("/")}>
              Home
            </Link>
            <Link to="/all-books" className={getLinkClasses("/all-books")}>
              All Books
            </Link>
            <Link to="/add-book" className={getLinkClasses("/add-book")}>
              Add Book
            </Link>
            <Link to="/my-books" className={getLinkClasses("/my-books")}>
              My Books
            </Link>
            <Link
              to="/my-schedules"
              className={getLinkClasses("/my-schedules")}
            >
              My Schedule
            </Link>
            {isAdmin && (
              <Link
                to="/admin-dashboard"
                className={getLinkClasses("/admin-dashboard")}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {user && (
              <Link to="/my-schedules">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-2 rounded-full hover:bg-gray-100 transition-colors ${
                    totalProgress ? "animate-pulse" : ""
                  }`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-t-2 border-emerald-500 border-solid rounded-full animate-spin"></div>
                  ) : (
                    <div className="relative">
                      <FaShoppingCart className="h-6 w-6 text-gray-600" />
                      {totalCart > 0 && (
                        <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {totalCart}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              </Link>
            )}

            <div className="hidden md:flex flex-col items-center justify-center font-medium text-center text-sm">
              <p className="text-emerald-500 uppercase text-xs">
                {getGreeting()}
              </p>
              {user && <p className="text-gray-700">{user.displayName}</p>}
            </div>

            {user?.email ? (
              <div ref={userRef} className="relative">
                <button
                  onClick={() => setUserDropdownVisible(!userDropdownVisible)}
                  className="flex items-center focus:outline-none"
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    src={user.photoURL || defaultAvatar}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover shadow-sm"
                    alt="Profile"
                  />
                </button>

                <AnimatePresence>
                  {userDropdownVisible && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100"
                    >
                      <li>
                        <Link
                          to="/user-analytics"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setUserDropdownVisible(false)}
                        >
                          User Analytics
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/my-profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setUserDropdownVisible(false)}
                        >
                          View Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt className="mr-2" />
                          Log Out
                        </button>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-emerald-500 hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-md"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              <Link
                to="/"
                className="block px-4 py-2 text-base font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/all-books"
                className="block px-4 py-2 text-base font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Books
              </Link>
              <Link
                to="/add-book"
                className="block px-4 py-2 text-base font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Add Book
              </Link>
              <Link
                to="/my-books"
                className="block px-4 py-2 text-base font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Books
              </Link>
              <Link
                to="/my-schedules"
                className="block px-4 py-2 text-base font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Schedule
              </Link>
              {isAdmin && (
                <Link
                  to="/admin-dashboard"
                  className="block px-4 py-2 text-base font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
