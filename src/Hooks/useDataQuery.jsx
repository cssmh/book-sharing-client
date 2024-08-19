import { getData } from "../Api/utils";
import { useQuery } from "@tanstack/react-query";

const useDataQuery = (key, url) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: key,
    queryFn: () => getData(url),
  });
  return { isLoading, data, error, refetch };
};

export default useDataQuery;
