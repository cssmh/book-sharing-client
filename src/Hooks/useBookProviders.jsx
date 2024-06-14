import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useBookProviders = () => {
  const axiosNoToken = useAxiosPublic();

  const { data: totalBooks, isLoading } = useQuery({
    queryKey: ["totalBooks"],
    queryFn: async () => {
      const res = await axiosNoToken.get("/all-books");
      return res.data.totalBooks;
    },
  });

  const { data: bookProviders = [], isLoading: providerLoading } = useQuery({
    queryKey: ["bookProviders"],
    queryFn: async () => {
      const res = await axiosNoToken.get("/book-providers");
      return res?.data;
    },
  });
  return { isLoading, totalBooks, providerLoading, bookProviders };
};

export default useBookProviders;

// Used in Count, AllBooksCols, BooksProvider
