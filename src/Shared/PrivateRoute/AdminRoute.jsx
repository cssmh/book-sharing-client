import useAuth from "../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import BigLoader from "../../Components/BigLoader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <BigLoader />
  if (user?.email === "admin@admin.com") return children;

  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
