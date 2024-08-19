import { useQuery } from "@tanstack/react-query";
import { getAllBooks, getBookProviders } from "../Api/books";

const useBookProviders = () => {
  const { data: totalBooks = 0, isLoading } = useQuery({
    queryKey: ["totalBooks"],
    queryFn: async () => {
      const res = await getAllBooks();
      return res.totalBooks.totalBooks;
    },
  });

  const { data: bookProviders = [], isLoading: providerLoading } = useQuery({
    queryKey: ["bookProviders"],
    queryFn: async () => {
      return getBookProviders();
    },
  });
  return { isLoading, totalBooks, providerLoading, bookProviders };
};

export default useBookProviders;

// Used in Count, AllBooksCols, BooksProvider
