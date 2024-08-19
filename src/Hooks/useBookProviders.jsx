import { useQuery } from "@tanstack/react-query";
import { getAllBooks, getBookProviders } from "../Api/books";

const useBookProviders = () => {
  const { data: totalBooks, isLoading } = useQuery({
    queryKey: ["totalBooks"],
    queryFn: () => getAllBooks()?.totalBooks,
  });

  const { data: bookProviders = [], isLoading: providerLoading } = useQuery({
    queryKey: ["bookProviders"],
    queryFn: () => getBookProviders(),
  });
  return { isLoading, totalBooks, providerLoading, bookProviders };
};

export default useBookProviders;

// Used in Count, AdminBooks, BooksProvider
