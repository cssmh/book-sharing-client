import CircleLoader from "../../Components/AllLoader/CircleLoader";
import useAuth from "../../Hooks/useAuth";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <CircleLoader />
  if (user?.email === "admin@admin.com") return children;

  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
