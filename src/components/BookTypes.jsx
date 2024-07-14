import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import {
  MdBook,
  MdSchool,
  MdAssignment,
  MdWork,
  MdLibraryBooks,
  MdFolder,
} from "react-icons/md";

const BookTypes = () => {
  const bookTypes = [
    { name: "TextBooks", icon: <MdBook size={23} color="#FF5733" /> },
    { name: "Academic", icon: <MdSchool size={23} color="#33FF57" /> },
    {
      name: "Research Thesis",
      icon: <MdAssignment size={23} color="#3357FF" />,
    },
    { name: "Job Related", icon: <MdWork size={23} color="#F39C12" /> },
    {
      name: "Fic Non-Fiction",
      icon: <MdLibraryBooks size={23} color="#8E44AD" />,
    },
    { name: "Anthologies", icon: <MdFolder size={23} color="#E74C3C" /> },
  ];

  return (
    <div className="max-w-7xl mx-2 md:mx-auto">
      <Swiper
        speed={200}
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
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {bookTypes.map((book, idx) => (
          <SwiperSlide key={idx}>
            <div className="mb-8 flex items-center text-xl justify-center gap-2 p-5 rounded-lg bg-white shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
              {book.icon}
              <span className="font-semibold">{book.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookTypes;
