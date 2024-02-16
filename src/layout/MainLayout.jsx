import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Header/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { FallingLines } from "react-loader-spinner";

const MainLayout = () => {
  const navigationForSpinner = useNavigation();
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[60vh]">
        {navigationForSpinner.state === "loading" ? (
          <div className="flex justify-center">
            <FallingLines
              color="#6fbf6d"
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
    </div>
  );
};

export default MainLayout;
