import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <section className="flex items-center justify-center h-[96vh] bg-gray-100 dark:bg-gray-900">
      <div className="container flex flex-col items-center justify-center px-6 py-12 mx-auto space-y-8">
        <h2 className="text-9xl font-bold text-green-600 drop-shadow-lg">
          404
        </h2>
        <div className="text-center">
          <p className="text-2xl md:text-4xl font-semibold text-gray-800 dark:text-white mb-4">
            Oops! Page Not Found
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            The page you’re looking for might have been removed or is
            temporarily unavailable.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-full shadow-md hover:bg-green-700 transition duration-300"
        >
          <FaHome className="mr-2" />
          Back to Homepage
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
