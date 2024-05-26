import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Shared/useCustomHook/useAuth";

const useMyBooksHook = (url) => {
  const axiosNoToken = useAxiosPublic();
  const { user } = useAuth();

  const {
    data: bookData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myBooks", url],
    queryFn: async () => {
      const res = await axiosNoToken.get(url);
      return res?.data;
    },
    enabled: !!user?.email, // Ensure the query runs only when the email is available
  });

  return { isLoading, bookData, error, refetch };
};

export default useMyBooksHook;

// used in BookDetails, MyBooks, UpdateBook and AddBook
