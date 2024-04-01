import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { HashLoader } from "react-spinners";
import Navbar from "../Components/Navbar/Navbar";

const MainLayout = () => {
  const navigationForSpinner = useNavigation();
  return (
    <div>
      <Navbar></Navbar>
      {navigationForSpinner.state === "loading" ? (
        <div className="flex justify-center min-h-[70vh] mt-5">
          <HashLoader color="#9933FF" size={36} />
        </div>
      ) : (
        <div className="min-h-[30vh] md:min-h-[70vh]">
          <Outlet></Outlet>
        </div>
      )}
      <Footer></Footer>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MainLayout;
