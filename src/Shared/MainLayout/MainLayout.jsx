import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import BigLoader from "./BigLoader";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1800);
  }, []);

  return (
    <>
      {loading ? (
        <BigLoader />
      ) : (
        <div>
          <Navbar />
          <div className="min-h-[65vh] md:min-h-[70vh]">
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default MainLayout;
