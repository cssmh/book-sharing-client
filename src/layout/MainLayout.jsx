import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Header/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { FallingLines } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const navigationForSpinner = useNavigation();
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[70vh]">
        {navigationForSpinner.state === "loading" ? (
          <div className="flex justify-center">
            <FallingLines
              color="#6cc262"
              width="70"
              visible={true}
              ariaLabel="falling-circles-loading"
            />
          </div>
        ) : (
          <Outlet></Outlet>
        )}
      </div>
      <Footer></Footer>
      <ToastContainer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default MainLayout;
