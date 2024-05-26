import useAuth from "../useCustomHook/useAuth";
import { FallingLines } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="flex justify-center">
        <FallingLines
          color="#9933FF"
          width="55"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  if (user?.email) {
    return children;
  } else {
    return <Navigate state={location?.pathname} to="/login"></Navigate>;
  }
};

export default PrivateRoute;
