import { Navigate } from "react-router-dom";
import useContextHook from "../useCustomHook/useContextHook";
import { FallingLines } from "react-loader-spinner";

const AdminPrivateRoute = ({ children }) => {
  const { user, loading } = useContextHook();

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

  if (user?.email == "admin@admin.com") {
    return children;
  } else {
    return <Navigate to="/"></Navigate>;
  }
};

export default AdminPrivateRoute;
