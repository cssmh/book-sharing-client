import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useBookProviders = () => {
  const axiosNoToken = useAxiosPublic();

  const { data: allBooks = [] } = useQuery({
    queryKey: ["allBooksData"],
    queryFn: async () => {
      const res = await axiosNoToken.get("/all-books");
      return res.data?.result;
    },
  });

  // Function to count the number of books each provider has
  const countBooksByProvider = (booksData) => {
    let bookCounts = [];

    booksData.forEach((book) => {
      const email = book.book_provider_email;
      if (bookCounts[email]) {
        bookCounts[email]++;
      } else {
        bookCounts[email] = 1;
      }
    });

    return bookCounts;
  };

  // Function to filter unique emails
  const filterUniqueEmails = (emails) => {
    const uniqueEmails = [];
    const seen = new Set();

    emails?.forEach((email) => {
      if (!seen?.has(email)) {
        uniqueEmails.push(email);
        seen.add(email);
      }
    });

    return uniqueEmails;
  };

  // Finding total book provider
  const emails = allBooks?.map((book) => book.book_provider_email);
  const uniqueEmails = filterUniqueEmails(emails);
  const booksByProvider = countBooksByProvider(allBooks);
  return { uniqueEmails, allBooks, booksByProvider };
};

export default useBookProviders;

// Used in Count, AllBooksCols, BooksProvider
