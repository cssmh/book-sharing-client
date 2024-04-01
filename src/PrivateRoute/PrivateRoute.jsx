import useContextHook from "../useCustomHook/useContextHook";
import { Navigate, useLocation } from "react-router-dom";
import useFallingLines from "../useCustomHook/useFallingLines";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContextHook();
  const location = useLocation();
  // console.log(location);
  const fallingLines = useFallingLines();
  if (loading) {
    return fallingLines;
  }

  if (!loading && user?.email) {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
};

export default PrivateRoute;
