import useAuth from "../../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute -top-7 inset-0 flex items-center justify-center">
          <ScaleLoader size={100} color="red" />
        </div>
      </div>
    );
  if (user) return children;

  return <Navigate to="/login" state={location?.pathname} replace />;
};

export default PrivateRoute;
