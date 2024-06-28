import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMyBooks = (url) => {
  const axiosNoToken = useAxiosPublic();
  const { loading, user } = useAuth();

  const {
    data: bookData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["myBooks", url],
    queryFn: async () => {
      const res = await axiosNoToken.get(url);
      return res?.data;
    },
    // Ensure the query runs only when the email is available
  });

  return { isLoading, bookData, error, refetch };
};

export default useMyBooks;

// used in BookDetails, MyBooks, UpdateBook, AddBook, MyPending, Banner, NotifyUser and MyProfile
