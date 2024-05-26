import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyCart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isLoading,
    error,
    data: myBookings,
    refetch,
  } = useQuery({
    queryKey: ["myBookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-bookings?email=${user?.email}`);
      return res?.data;
    },
    enabled: !!user?.email,
  });

  return { myBookings, error, refetch, isLoading };
};

export default useMyCart;
