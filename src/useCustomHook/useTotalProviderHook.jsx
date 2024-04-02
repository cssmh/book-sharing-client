import axios from "axios";
import { useEffect, useState } from "react";

const useTotalProviderHook = () => {
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    axios
      .get("https://book-sharing-server.vercel.app/allBooks")
      .then((res) => setAllBooks(res.data?.result));
  }, []);

  // finding total book provider
  const emails = allBooks?.map((book) => book.book_provider_email);
  const filterUniqueEmails = (emails) => {
    const uniqueEmails = [];
    const seen = new Set();

    emails?.forEach((email) => {
      if (!seen.has(email)) {
        uniqueEmails.push(email);
        seen.add(email);
      }
    });

    return uniqueEmails;
  };

  const uniqueEmails = filterUniqueEmails(emails);
  return { uniqueEmails, allBooks };
};

export default useTotalProviderHook;
