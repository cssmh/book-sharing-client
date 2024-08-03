import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[94vh] bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">Oops!</h1>
      <p className="mt-4 text-lg text-gray-700 mx-5 md:mx-0 text-center">
        Something went wrong. We couldn’t find the page you’re looking for.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          className="px-4 py-2 text-white bg-green-500 rounded transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
