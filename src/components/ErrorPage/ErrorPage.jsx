import { Link } from "react-router-dom";
import Error from "../../assets/ErrorLogo.png";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const ErrorPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto flex justify-center">
        <div>
          <img src={Error} alt="" />
          <p className="text-center mt-3">
            Sorry, the page you are looking for does not exist!
          </p>
          <div className="flex justify-center my-3">
            <button className="btn bg-green-400 text-white ">
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
