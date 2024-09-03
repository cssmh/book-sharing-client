import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "../Api/bookings";

const useMyBookings = () => {
  const { loading, user } = useAuth();

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

  return {
    isLoading,
    myBookings,
    refetch,
    error,
  };
};

export default useMyBookings;
