import { getData } from "../Api/books";
import { useQuery } from "@tanstack/react-query";

const useDataQuery = (key, url, enabled = true) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: key,
    queryFn: () => getData(url),
    enabled,
  });
  return { isLoading, data, error, refetch };
};

export default useDataQuery;
