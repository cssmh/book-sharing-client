import { Navigate } from "react-router-dom";
import useContextHook from "../useCustomHook/useContextHook";
import useFallingLines from "../useCustomHook/useFallingLines";
import toast from "react-hot-toast";

const AdminPrivateRoute = ({ children }) => {
  const { user, loading } = useContextHook();
  const fallingLines = useFallingLines();

  if (loading) {
    return fallingLines;
  }

  if (user?.email == "admin@admin.com") {
    return children;
  } else {
    toast.error("Admin route access violation detected. Access denied.");
    return <Navigate to="/"></Navigate>;
  }
};

export default AdminPrivateRoute;
