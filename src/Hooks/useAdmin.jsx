import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { getRole } from "../Api/auth";

const useAdmin = () => {
  const { loading, user } = useAuth();

  const { data: role = " ", isLoading: roleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: () => getRole(user?.email),
  });
  const isLoading = loading || roleLoading;
  const isAdmin = role === "admin";
  return { isAdmin, isLoading };
};

export default useAdmin;
