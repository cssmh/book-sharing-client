import { useEffect, useState } from "react";
import BigLoader from "../../Components/BigLoader";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const loc = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1600);

    return () => clearTimeout(timeout);
  }, []);

  const noHeaderFooter =
    loc?.pathname?.startsWith("/admin-dashboard") ||
    loc?.pathname?.startsWith("/login") ||
    loc?.pathname?.startsWith("/register");

  if (loading) return <BigLoader />;

  return (
    <div>
      {!noHeaderFooter && <Navbar />}
      <div className="min-h-[65vh] md:min-h-[70vh]">
        <Outlet />
      </div>
      {!noHeaderFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
