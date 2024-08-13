import useAuth from "../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const admin = user?.email === "admin@admin.com";

  if (loading)
    return (
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute -top-7 inset-0 flex items-center justify-center">
          <ScaleLoader size={100} color="red" />
        </div>
      </div>
    );
  if (admin) return children;

  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
