import { useEffect, useState } from "react";
import BigLoader from "../../Components/AllLoader/BigLoader";
import { Outlet } from "react-router-dom";
import useQueryPublic from "../../Hooks/useQueryPublic";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(false);
  const { isLoading, data = null } = useQueryPublic(["status"], "/");

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const msgTimeout = setTimeout(() => {
      if (isLoading) {
        setMsg(true);
      }
    }, 5000);

    return () => {
      clearTimeout(loadTimeout);
      clearTimeout(msgTimeout);
    };
  }, [isLoading]);

  if (loading || isLoading || data !== "BOOKS ARE YOURS") {
    return (
      <>
        <BigLoader />{" "}
        {msg && (
          <p className="fixed bottom-4 left-4">
            Trying to connect to the server......
          </p>
        )}
      </>
    );
  }

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
