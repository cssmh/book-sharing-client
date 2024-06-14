import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useQueryPublic = (key, url) => {
  const axiosNoToken = useAxiosPublic();
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const res = await axiosNoToken.get(url);
      return res?.data;
    },
  });
  return { isLoading, data, error, refetch };
};

export default useQueryPublic;

// used in DashHome, Count, AllBooksCols, AllBooks, MyBookingCard,
// latestUpdates, DashHome, BookDetails, MyBookingCard, PopularBooks,
// SameProviders, UpdateBook, MainLayout
