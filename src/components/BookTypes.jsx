// BookTypes.jsx (updated)
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
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
    {
      name: "TextBooks",
      icon: <MdBook size={28} className="text-emerald-500" />,
    },
    {
      name: "Academic",
      icon: <MdSchool size={28} className="text-blue-500" />,
    },
    {
      name: "Research Thesis",
      icon: <MdAssignment size={28} className="text-purple-500" />,
    },
    {
      name: "Job Related",
      icon: <MdWork size={28} className="text-orange-500" />,
    },
    {
      name: "Fic Non-Fiction",
      icon: <MdLibraryBooks size={28} className="text-pink-500" />,
    },
    {
      name: "Anthologies",
      icon: <MdFolder size={28} className="text-red-500" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="container 2xl:max-w-[1370px] mx-2 md:mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-5"
      >
        Explore Our <span className="text-emerald-500">Book Categories</span>
      </motion.h2>

      <Swiper
        speed={200}
        grabCursor={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="pb-3"
      >
        {bookTypes.map((book, idx) => (
          <SwiperSlide key={idx}>
            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="mb-8 flex items-center text-xl justify-center gap-2 p-5 rounded-lg bg-white shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              {book.icon}
              <span className="font-semibold">{book.name}</span>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BookTypes;
