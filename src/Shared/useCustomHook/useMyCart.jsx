import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useMyCart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: allMyBookings = null, refetch } = useQuery({
    queryKey: ["allMyBookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-bookings?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { allMyBookings, refetch };
};

export default useMyCart;
