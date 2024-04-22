import { Link } from "react-router-dom";
import ErrorLogo from "../../assets/ErrorLogo.png";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div>
        <img
          src={ErrorLogo}
          onContextMenu={(e) => e.preventDefault()}
          className="mx-auto"
        />
        <div className="flex justify-center mt-3">
          <button className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            <Link to="/">Return to Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
