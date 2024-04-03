import useContextHook from "../useCustomHook/useContextHook";
import { Navigate, useLocation } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContextHook();
  const location = useLocation();
  // console.log(location);
  
  if (loading) {
    return (
      <div className="flex justify-center">
        <FallingLines
          color="#9933FF"
          width="60"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  if (!loading && user?.email) {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
};

export default PrivateRoute;
