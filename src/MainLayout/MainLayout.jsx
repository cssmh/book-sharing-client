import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { FallingLines } from "react-loader-spinner";
import { Toaster } from "react-hot-toast";
import Navbar from "../Components/Navbar/Navbar";

const MainLayout = () => {
  const navigationForSpinner = useNavigation();
  return (
    <div>
      <Navbar></Navbar>
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
        <div className="min-h-[70vh]">
          <Outlet></Outlet>
        </div>
      )}
      <Footer></Footer>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default MainLayout;
