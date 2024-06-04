import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import { Link } from "react-router-dom";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import PopularBookCard from "../PopularBookCard/PopularBookCard";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const PopularBooks = () => {
  const axiosNoToken = useAxiosPublic();
  const [skeletonSize, setSkeletonSize] = useState(0);
  
  const {
    isLoading,
    error,
    data: popularBooks,
  } = useQuery({
    queryKey: ["popularBooks"],
    queryFn: async () => {
      const res = await axiosNoToken.get("/all-books?limit=6");
      return res.data?.result;
    },
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSkeletonSize(1);
      } else {
        setSkeletonSize(3);
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
        {[...Array(skeletonSize)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl md:text-2xl font-semibold text-red-600 italic my-6">
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
        <Swiper
          speed={1000}
          grabCursor={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            480: {
              slidesPerView: 1,
              // 1 slide visible on small screens
              // / 480, 768, 1000 and 1200
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1000: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {popularBooks?.map((book) => (
            <SwiperSlide key={book._id}>
              <PopularBookCard getBook={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-center my-7">
        <Link to="/all-books">
          <button className="text-white bg-gradient-to-r from-green-400 via-green-400 to-green-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Show all Books
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularBooks;
