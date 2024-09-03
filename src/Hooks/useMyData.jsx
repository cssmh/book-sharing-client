import { getMyBookings, getMyCart } from "../Api/bookings";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useMyData = () => {
  const { loading, user } = useAuth();

  // Query to fetch cart data (no token required)
  const {
    data = {},
    isLoading: cartLoading,
    refetch: cartRefetch,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["myCart", user?.email],
    queryFn: () => getMyCart(user?.email),
  });

  // Query to fetch bookings data (requires token)
  const {
    data: myBookings = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["myBookings", user?.email],
    queryFn: () => getMyBookings(user?.email),
  });

  // Extract data from cartData
  const { totalCart = 0, myProgress = 0 } = data;

  return {
    totalCart,
    myProgress,
    cartLoading,
    cartRefetch,
    isLoading,
    myBookings,
    refetch,
    error,
  };
};

export default useMyData;
