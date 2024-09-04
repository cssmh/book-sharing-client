import useAuth from "./useAuth";
import useDataQuery from "./useDataQuery";

const useAdmin = () => {
  const { loading, user } = useAuth();
  const { data: role = " ", isLoading: roleLoading } = useDataQuery(
    ["role", user?.email],
    `/role/${user?.email}`,
    !loading && !!user?.email
  );
  
  const isLoading = loading || roleLoading;
  const isAdmin = role === "admin";
  return { isAdmin, isLoading };
};

export default useAdmin;
