import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Helmet } from "react-helmet-async";

const AdminLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <Helmet>
        <title>BookHaven | Admin Dashboard</title>
      </Helmet>
      <Sidebar />
      <div className="flex-1 md:ml-60">
        <div className="md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
