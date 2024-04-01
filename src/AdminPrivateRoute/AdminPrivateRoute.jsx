import { Navigate } from "react-router-dom";
import useContextHook from "../useCustomHook/useContextHook";
import useFallingLines from "../useCustomHook/useFallingLines";

const AdminPrivateRoute = ({ children }) => {
  const { user, loading } = useContextHook();
  const fallingLines = useFallingLines();

  if (loading) {
    return fallingLines;
  }

  if (user?.email == "admin@admin.com") {
    return children;
  } else {
    return <Navigate to="/"></Navigate>;
  }
};

export default AdminPrivateRoute;
