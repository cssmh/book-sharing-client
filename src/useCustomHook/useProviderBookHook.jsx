import { useState, useEffect } from "react";
import useAxiosHook from "./useAxiosHook";

const useProviderBookHook = (url) => {
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const axiosCustom = useAxiosHook();

  useEffect(() => {
    axiosCustom.get(url).then((res) => {
      setBookData(res?.data);
      setIsLoading(false);
    });
  }, [axiosCustom, url]);

  return { bookData, isLoading };
};

export default useProviderBookHook;

// used BookDetails and SameProvider.jsx
