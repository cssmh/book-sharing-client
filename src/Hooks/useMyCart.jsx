import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMyCart = () => {
  const { loading, user } = useAuth();
  const axiosNoToken = useAxiosPublic();

  const {
    isLoading,
    data = [],
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
  const myBookings = data?.result;
  const totalCart = data?.totalCart;

  return {
    isLoading,
    myBookings,
    totalCart,
    error,
    cartRefetch,
  };
};

export default useMyCart;
