import { useQuery } from "@tanstack/react-query";
import BigLoader from "./BigLoader";
import { Outlet } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const axiosNoToken = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(false);

  const { isLoading, data = null } = useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const res = await axiosNoToken.get("/");
      return res?.data;
    },
  });

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
        {msg && <p className="pl-2">Trying to connect to the server......</p>}
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-493px)] md:min-h-[calc(100vh-337px)] lg:min-h-[calc(100vh-337px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default MainLayout;
