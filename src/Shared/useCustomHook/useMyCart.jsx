import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMyCart = () => {
  const { user } = useAuth();
  const axiosNoToken = useAxiosPublic();
  const [progress, setProgress] = useState(null);

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
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (myBookings?.length > 0) {
      const findProgress = myBookings.find(
        (booking) => booking.status === "Progress"
      );
      setProgress(findProgress);
    }
  }, [myBookings]);

  return {
    isLoading,
    myBookings,
    error,
    cartRefetch,
    progress,
  };
};

export default useMyCart;
