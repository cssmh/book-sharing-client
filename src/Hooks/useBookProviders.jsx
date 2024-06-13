import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useBookProviders = () => {
  const axiosNoToken = useAxiosPublic();

  const { data: allBooks = [], isLoading } = useQuery({
    queryKey: ["allBooksData"],
    queryFn: async () => {
      const res = await axiosNoToken.get("/all-books");
      return res.data?.result;
    },
  });

  const { data: bookProviders = [], isLoading: providerLoading } = useQuery({
    queryKey: ["bookProviders"],
    queryFn: async () => {
      const res = await axiosNoToken.get("/book-providers");
      return res?.data;
    },
  });
  return { isLoading, providerLoading, bookProviders, allBooks };
};

export default useBookProviders;

// Used in Count, AllBooksCols, BooksProvider
