import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import loggieData from "../assets/Logo.json";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container 2xl:max-w-[1370px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-8">
          <div className="flex-1 max-w-md">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Lottie
                className="w-12 h-12"
                animationData={loggieData}
                loop={true}
              />
              <span className="text-2xl font-bold text-emerald-400">
                MBSTU BookHaven
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              Connecting book lovers across campus. Share, discover, and
              exchange knowledge through our growing community of readers.
            </p>
            <div className="flex space-x-4">
              <a
                href="http://facebook.com/touristmomen"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="http://instagram.com/tourist_offl"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-books"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  All Books
                </Link>
              </li>
              <li>
                <Link
                  to="/add-book"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Add Book
                </Link>
              </li>
              <li>
                <Link
                  to="/my-books"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  My Books
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-emerald-400" />
                <span className="text-gray-400">
                  Tangail, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-emerald-400" />
                <span className="text-gray-400">+8801767616067</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-emerald-400" />
                <span className="text-gray-400">bookhaven@mail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MBSTU BookHaven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
