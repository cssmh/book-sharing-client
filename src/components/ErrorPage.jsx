import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <section className="flex items-center h-screen p-16 bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-600 dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn&#39;t find this page.
          </p>
          <p className="mt-4 mb-8 text-gray-400">
            But don&#39;t worry, you can find plenty of other things on our
            homepage.
          </p>
          <Link
            to="/"
            className="flex items-center px-4 py-2 font-semibold text-white bg-green-600 rounded transition duration-300"
          >
            <FaHome className="mr-2" />
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
