import { Navigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import useAdmin from "../../Hooks/useAdmin";
const AdminRoute = ({ children }) => {
  const { isAdmin, isLoading } = useAdmin();

  if (isLoading)
    return (
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute -top-7 inset-0 flex items-center justify-center">
          <ScaleLoader size={100} color="red" />
        </div>
      </div>
    );
  if (isAdmin) return children;

  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
