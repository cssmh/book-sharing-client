import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import { Link } from "react-router-dom";
import SkeletonCard from "../../Components/AllSkeleton/SkeletonCard";
import PopularBookCard from "../PopularBookCard/PopularBookCard";
import useDataQuery from "../../Hooks/useDataQuery";

const PopularBooks = () => {
  const {
    isLoading,
    error,
    data: latestBooks = [],
  } = useDataQuery(["latestBooks"], "/latest-books");

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto my-10">
        {Array.from({ length: 3 }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl md:text-2xl font-semibold text-red-600 italic my-6">
        An error occurred while fetching latest books.
      </div>
    );
  }

  return (
    <div className="max-w-[1250px] mx-1 md:mx-auto">
      <h1
        data-aos="zoom-in"
        data-aos-delay="100"
        data-aos-offset="100"
        className="text-center my-5 md:my-8 font-bold text-xl md:text-2xl italic border-b-2 pb-3 max-w-md mx-auto border-blue-600"
      >
        Our Latest Books
      </h1>
      <Swiper
        speed={500}
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
          480: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1000: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 3, spaceBetween: 20 },
        }}
      >
        {latestBooks.map((book) => (
          <SwiperSlide key={book._id}>
            <PopularBookCard getBook={book} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center my-4 md:my-6">
        <Link to="/all-books">
          <button className="text-green-500 border border-green-500 hover:bg-green-500 hover:text-white transition duration-300 ease-in-out font-medium rounded-3xl text-sm px-5 py-2.5 text-center">
            Show All Books
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularBooks;
