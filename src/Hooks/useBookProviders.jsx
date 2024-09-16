import useDataQuery from "./useDataQuery";

const useBookProviders = () => {
  const { data = {}, isLoading } = useDataQuery(["totalBooks"], "/all-books");
  const { totalBooks } = data;

  const { data: data2 = [], isLoading: loading } = useDataQuery(
    ["bookProviders"],
    "/book-providers"
  );
  const { result: bookProviders, totalBookings } = data2;
  return { isLoading, loading, totalBooks, bookProviders, totalBookings };
};

export default useBookProviders;
