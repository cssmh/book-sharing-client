import useDataQuery from "./useDataQuery";

const useBookProviders = () => {
  const { data = {}, isLoading } = useDataQuery(["totalBooks"], "/all-books");
  const totalBooks = data?.totalBooks;

  const { data: bookProviders = [], isLoading: loading } = useDataQuery(
    ["bookProviders"],
    "/book-providers"
  );
  return { isLoading, loading, totalBooks, bookProviders };
};

export default useBookProviders;
