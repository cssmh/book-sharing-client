import { Link } from "react-router-dom";
import ErrorLogo from "../../assets/ErrorLogo.png";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const ErrorPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto flex justify-center">
        <div>
          <img src={ErrorLogo} alt="" />
          <div className="flex justify-center mt-3">
            <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              <Link to="/">Return to Home</Link>
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ErrorPage;
