import useAuth from "../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="h-[92vh] flex flex-col justify-center items-center">
        <ScaleLoader size={100} color="red" />
      </div>
    );
  if (user?.email === "admin@admin.com") return children;

  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
