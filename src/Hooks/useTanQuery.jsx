import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTanQuery = (key, url) => {
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

export default useTanQuery;
