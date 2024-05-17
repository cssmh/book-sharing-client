import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import PopularBookCard from "../PopularBookCard/PopularBookCard";
import useAxiosHook from "../../useCustomHook/useAxiosHook";
import { useQuery } from "@tanstack/react-query";

const PopularBooks = () => {
  const { axiosNoToken } = useAxiosHook();
  const [sliceSize, setSliceSize] = useState(6);

  const getPopularBooks = async () => {
    const res = await axiosNoToken.get(`/all-books?limit=${sliceSize}`);
    return res?.data;
  };

  const {
    isLoading,
    error,
    data: popularBooks,
  } = useQuery({
    queryKey: ["popularBooks", sliceSize],
    queryFn: getPopularBooks,
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSliceSize(3);
      } else {
        setSliceSize(6);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto my-10">
        {[...Array(3)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl md:text-2xl font-semibold text-red-600 italic mt-6">
        An error occurred while fetching popular books.
      </div>
    );
  }

  return (
    <div>
      <div data-aos="zoom-in" data-aos-delay="100" data-aos-offset="100">
        <h3 className="text-center my-5 md:my-8 font-bold text-2xl md:text-3xl italic border-b-2 pb-3 max-w-md mx-auto border-blue-700">
          Our Popular Books
        </h3>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {popularBooks?.result?.map((book) => (
            <PopularBookCard key={book._id} getBook={book}></PopularBookCard>
          ))}
        </div>
        <div className="flex justify-center my-10">
          <Link to="/all-books">
            <button className="text-white bg-gradient-to-r from-green-400 via-green-400 to-green-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Show all Books
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularBooks;
