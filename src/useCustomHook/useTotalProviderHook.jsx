import { useEffect, useState } from "react";
import useAxiosHook from "./useAxiosHook";

const useTotalProviderHook = () => {
  const { axiosNoToken } = useAxiosHook();
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    axiosNoToken.get("/allBooks").then((res) => setAllBooks(res.data?.result));
  }, [axiosNoToken]);

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

export default useTotalProviderHook;

// Used in Counting and AdminBooking
