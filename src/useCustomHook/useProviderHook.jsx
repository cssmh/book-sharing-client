import { useState, useEffect } from "react";
import useAxiosHook from "./useAxiosHook";

const useProviderHook = (url) => {
  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { axiosSecure } = useAxiosHook();

  useEffect(() => {
    axiosSecure.get(url)?.then((res) => {
      setBookData(res?.data);
      setIsLoading(false);
    });
  }, [axiosSecure, url]);

  return { bookData, isLoading };
};

export default useProviderHook;

// used BookDetails and SameProvider.jsx
