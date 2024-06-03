import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useMyCart = () => {
  const { user } = useAuth();
  const axiosNoToken = useAxiosPublic();
  const [progress, setProgress] = useState(null);

  const { data: bookings = [], refetch: cartRefetch } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosNoToken.get(`/my-bookings?email=${user?.email}`, { withCredentials: true });
      return res?.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (bookings?.length > 0) {
      const findProgress = bookings.find(
        (booking) => booking.status === "Progress"
      );
      setProgress(findProgress);
    }
  }, [bookings]);

  return {
    bookings,
    cartRefetch,
    progress,
  };
};

export default useMyCart;
