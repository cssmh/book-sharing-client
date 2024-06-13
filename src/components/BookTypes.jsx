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
    { name: "TextBooks", icon: <Book size={24} /> },
    { name: "Academic", icon: <BookOpen size={24} /> },
    { name: "Research Thesis", icon: <Monitor size={24} /> },
    { name: "Job Related", icon: <Briefcase size={24} /> },
    { name: "Fiction Non-Fiction", icon: <Clipboard size={24} /> },
    { name: "Anthologies", icon: <Layers size={24} /> }, 
  ];

  return (
    <div className="max-w-7xl mx-auto">
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
            <div className="mb-10 flex flex-col items-center justify-center h-full p-4 bg-gray-100 rounded-lg">
              {book.icon}
              <p className="text-center mt-2 text-xl">{book.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookTypes;
