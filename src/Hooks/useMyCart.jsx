import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMyCart = () => {
  const { loading, user } = useAuth();
  const axiosNoToken = useAxiosPublic();

  const {
    isLoading,
    data: myBookings = [],
    error,
    refetch: cartRefetch,
  } = useQuery({
    queryKey: ["myBookings", user?.email],
    queryFn: async () => {
      const res = await axiosNoToken.get(`/my-bookings?email=${user?.email}`, {
        withCredentials: true,
      });
      return res?.data;
    },
    enabled: !loading && !!user?.email,
  });

  return {
    isLoading,
    myBookings,
    error,
    cartRefetch,
  };
};

export default useMyCart;
