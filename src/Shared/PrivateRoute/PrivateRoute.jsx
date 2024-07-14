import useAuth from "../../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import BigLoader from "../../Components/BigLoader";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <BigLoader />;
  if (user) return children;

  return <Navigate to="/login" state={location?.pathname} replace />;
};

export default PrivateRoute;
