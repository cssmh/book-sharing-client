import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import HavenHelmet from "../Components/HavenHelmet";

const DashLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-gray-100">
      <HavenHelmet title="Admin Dashboard" />
      <Sidebar />
      <div className="flex-1 md:ml-64 p-4 md:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashLayout;
