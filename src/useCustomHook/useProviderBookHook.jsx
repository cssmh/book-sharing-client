import { useState, useEffect } from "react";
import useAxiosHook from "./useAxiosHook";

const useProviderBookHook = (url) => {
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

export default useProviderBookHook;

// used BookDetails and SameProvider.jsx
