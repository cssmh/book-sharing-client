import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import {
  Book,
  Layers,
  BookOpen,
  Monitor,
  Briefcase,
  Clipboard,
} from "react-feather";

const BookTypes = () => {
  const bookTypes = [
    { name: "TextBooks", icon: <Book size={23} /> },
    { name: "Academic", icon: <BookOpen size={23} /> },
    { name: "Research Thesis", icon: <Monitor size={23} /> },
    { name: "Job Related", icon: <Briefcase size={23} /> },
    { name: "Fiction Non-Fiction", icon: <Clipboard size={23} /> },
    { name: "Anthologies", icon: <Layers size={23} /> },
  ];

  return (
    <div className="max-w-[1220px] mx-auto">
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
            <div className="mb-10 flex items-center text-xl justify-center gap-2 p-5 text-gray-500 rounded-lg">
              {book.icon}
              {book.name}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookTypes;
