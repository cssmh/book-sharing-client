import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useProviderHook = (url) => {
  const axiosNoToken = useAxiosPublic()

  const { data: bookData = [], isLoading } = useQuery({
    queryKey: ["bookData", url],
    queryFn: async () => {
      const res = await axiosNoToken.get(url);
      return res?.data;
    },
  });

  return { isLoading, bookData };
};

export default useProviderHook;

// used BookDetails
