import useAuth from "../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center mt-5">
        <HashLoader color="#FB0F5A" size={32} />
      </div>
    );
  if (user?.email == "admin@admin.com") return children;

  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
