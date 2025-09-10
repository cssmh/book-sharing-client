// Banner.jsx (updated)
import { Link } from "react-router-dom";
import banner from "../assets/book-share.jpeg";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-emerald-50 py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Share <span className="text-emerald-500">Knowledge</span>, <br />
            Grow <span className="text-blue-500">Together</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Discover new books, share your favorites, and build a community of
            readers right here at MBSTU.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/add-book">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                Start Sharing Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>
            </Link>

            <Link to="/all-books">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-emerald-500 text-emerald-500 hover:bg-emerald-50 font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                Browse Books
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 lg:mt-16 flex justify-center"
        >
          <div className="relative max-w-4xl w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-2xl blur-lg opacity-20"></div>
            <img
              src={banner}
              alt="Book sharing community"
              className="relative rounded-2xl shadow-2xl w-full max-w-3xl mx-auto"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
