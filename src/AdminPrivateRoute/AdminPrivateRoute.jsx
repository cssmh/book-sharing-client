import { Navigate } from "react-router-dom";
import useContextHook from "../useCustomHook/useContextHook";
import { HashLoader } from "react-spinners";

const AdminPrivateRoute = ({ children }) => {
  const { user, loading } = useContextHook();

  if (loading) {
    return (
      <div className="flex justify-center mt-5">
        <HashLoader color="#FB0F5A" size={36} />
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
