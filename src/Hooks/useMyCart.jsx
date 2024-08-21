import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../Api/bookings";

const useMyCart = () => {
  const { loading, user } = useAuth();
  
  const {
    isLoading,
    data = [],
    error,
    refetch: cartRefetch,
  } = useQuery({
    queryKey: ["myBookings", user?.email],
    queryFn: () => getBookings(user?.email),
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
