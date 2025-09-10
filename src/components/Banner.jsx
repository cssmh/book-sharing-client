import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import banner from "../assets/book-share.jpeg";

const Banner = () => {
  return (
    <section className="relative px-6 pt-16 lg:pt-24 text-center bg-white dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
          Share <span className="text-green-500">& Discover</span> Books
        </h1>
        <p className="max-w-xl mx-auto mt-4 text-gray-600 dark:text-gray-300 text-base">
          Explore, exchange, and connect through the world of books.
        </p>
        <Link to="/add-book">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 mt-6 text-white text-sm md:text-base font-medium bg-green-500 rounded-lg shadow hover:bg-green-600 transition"
          >
            Start Sharing
          </motion.button>
        </Link>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Let’s build a culture of knowledge sharing
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-10 flex justify-center"
      >
        <img
          src={banner}
          alt="Books Banner"
          className="rounded-xl object-cover w-full max-w-4xl shadow-md"
          onContextMenu={(e) => e.preventDefault()}
        />
      </motion.div>
    </section>
  );
};

export default Banner;
