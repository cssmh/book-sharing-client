import { useEffect, useState } from "react";
import BigLoader from "../../Components/AllLoader/BigLoader";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const MainLayout = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1800);
  }, []);

  if (loading) return <BigLoader />;

  return (
    <div>
      <Navbar />
      <div className="min-h-[65vh] md:min-h-[70vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default MainLayout;
