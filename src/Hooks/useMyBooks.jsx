import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMyBooks = (url) => {
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
    enabled: !!user?.email, 
    // Ensure the query runs only when the email is available
  });

  return { isLoading, bookData, error, refetch };
};

export default useMyBooks;

// used in BookDetails, MyBooks, UpdateBook, AddBook, MyPending, Banner, NotifyUser and MyProfile
