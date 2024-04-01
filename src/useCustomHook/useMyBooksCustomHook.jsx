import { useState, useEffect } from "react";
import useAxiosHook from "./useAxiosHook";

const useMyBooksCustomHook = (url) => {
  const [providerBook, setProviderBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const axiosCustom = useAxiosHook();

  useEffect(() => {
    if (!url) return;
    axiosCustom?.get(url).then((res) => {
      setProviderBook(res.data);
      setIsLoading(false);
    });
  }, [axiosCustom, url]);

  return { providerBook, isLoading, setProviderBook };
};

export default useMyBooksCustomHook;

// used BookDetails and SameProvider.jsx
