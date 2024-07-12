import useAuth from "../Hooks/useAuth";
import AdminDashboard from "../Dashboard/AdminDashboard";
import UserDashboard from "../Dashboard/UserDashboard";

const DashHome = () => {
  const {user}= useAuth()
  const admin = user?.email === "admin@admin.com";
  return (
    <div>
      {admin && <AdminDashboard></AdminDashboard>}
      {user?.email && <UserDashboard></UserDashboard>}
    </div>
  );
};

export default DashHome;