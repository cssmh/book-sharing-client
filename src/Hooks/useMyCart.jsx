import useAuth from "./useAuth";
import useDataQuery from "./useDataQuery";

const useMyCart = () => {
  const { loading, user } = useAuth();

  const {
    isLoading,
    data = {},
    refetch,
    error,
  } = useDataQuery(
    ["myBookings", user?.email],
    `/my-bookings?email=${user?.email}`,
    !loading && !!user?.email
  );

  const { result: myBookings = [], totalCart = 0, totalProgress = 0 } = data;

  return {
    isLoading,
    myBookings,
    totalCart,
    totalProgress,
    refetch,
    error,
  };
};

export default useMyCart;
