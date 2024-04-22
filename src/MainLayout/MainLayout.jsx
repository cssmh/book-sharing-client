import { Toaster } from "react-hot-toast";
import { HashLoader } from "react-spinners";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  const navigation = useNavigation();
  return (
    <div>
      <Navbar />
      <div className="min-h-[60vh] md:min-h-[70vh]">
        {navigation.state === "loading" ? (
          <div className="flex justify-center mt-5">
            <HashLoader color="#9933FF" size={32} />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MainLayout;
