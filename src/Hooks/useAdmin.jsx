import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { loading, user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = " ", isLoading: roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/role/${user?.email}`);
      return res?.data;
    },
    enabled: !loading && !!user?.email,
  });
  const isLoading = loading || roleLoading;
  const isAdmin = role === "admin";
  return { isAdmin, isLoading };
};

export default useAdmin;
