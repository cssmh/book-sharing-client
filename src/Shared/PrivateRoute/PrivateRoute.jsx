import useAuth from "../../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import SmallSpinner from "../../Components/SmallSpinner";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <SmallSpinner />;
  if (user) return children;

  return <Navigate to="/login" state={location?.pathname} replace />;
};

export default PrivateRoute;
