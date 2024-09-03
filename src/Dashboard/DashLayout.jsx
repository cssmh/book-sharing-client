import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import HavenHelmet from "../Components/HavenHelmet";

const DashLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <HavenHelmet title="Admin Dashboard" />
      <Sidebar />
      <div className="flex-1 md:ml-60">
        <div className="md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
