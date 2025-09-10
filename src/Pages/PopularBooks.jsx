import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import { Link } from "react-router-dom";
import SkeletonCard from "../Components/AllSkeleton/SkeletonCard";
import PopularBookCard from "./PopularBookCard";
import useDataQuery from "../Hooks/useDataQuery";
import useIsLarge from "../Hooks/useIsLarge";

const PopularBooks = () => {
  const cart = useIsLarge();
  const { isLoading, data: latestBooks = [] } = useDataQuery(
    ["latestBooks"],
    "/latest-books"
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-6 mx-auto mt-7 mb-9">
        {[...Array(cart)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="container 2xl:max-w-[1370px] mx-1 md:mx-auto">
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
          pauseOnMouseEnter: false,
          waitForTransition: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          480: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1000: { slidesPerView: 3, spaceBetween: 20 },
          1536: { slidesPerView: 4, spaceBetween: 10 },
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
