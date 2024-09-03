import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { getMyCart } from "../Api/bookings";

const useMyCart = () => {
  const { loading, user } = useAuth();

  const {
    isLoading,
    data = {},
    refetch: cartRefetch,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["MyCart", user?.email],
    queryFn: () => getMyCart(user?.email),
  });
  const { totalCart = 0, myProgress = 0 } = data;

  return {
    isLoading,
    totalCart,
    myProgress,
    cartRefetch,
  };
};

export default useMyCart;
