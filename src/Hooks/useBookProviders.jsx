import { useQuery } from "@tanstack/react-query";
import { getAllBooks, getBookProviders } from "../Api/books";

const useBookProviders = () => {
  const { data: totalBooks = 0, isLoading } = useQuery({
    queryKey: ["totalBooks"],
    queryFn: async () => {
      const res = await getAllBooks();
      return res?.totalBooks;
    },
  });

  const { data: bookProviders = [], isLoading: loading } = useQuery({
    queryKey: ["bookProviders"],
    queryFn: () => getBookProviders(),
  });

  return { isLoading, loading, totalBooks, bookProviders };
};

export default useBookProviders;

// const { data: allBooksData, isLoading: isBooksLoading } = useQuery({
//   queryKey: ["AllBooksCount"],
//   queryFn: () => getAllBooks(),
//   select: (data) => data.totalBooks
// });
