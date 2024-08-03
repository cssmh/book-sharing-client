import useAuth from "../../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="h-[92vh] flex flex-col justify-center items-center">
        <ScaleLoader size={100} color="red" />
      </div>
    );
  if (user) return children;

  return <Navigate to="/login" state={location?.pathname} replace />;
};

export default PrivateRoute;
