import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useEffect, useState } from "react";

const useMyCart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [progress, setProgress] = useState([]);

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

  useEffect(() => {
    if (myBookings) {
      const checkProgress = myBookings.find(
        (book) => book.status === "Progress"
      );
      setProgress(checkProgress);
    }
  }, [myBookings]);

  return { myBookings, error, refetch, isLoading, progress };
};

export default useMyCart;
