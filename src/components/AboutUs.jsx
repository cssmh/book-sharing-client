import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="container 2xl:max-w-[1370px] mx-auto mb-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-5 text-gray-800">
          About <span className="text-green-500">Us</span>
        </h2>
        <p className="text-gray-600 leading-relaxed">
          BookHaven is an innovative online platform dedicated to the community
          of book lovers and avid readers of MBSTU students. With its
          user-friendly interface and extensive library of titles, BookHaven
          offers a unique space for users to discover, share, and discuss their
          favorite books. Users can create bookshelves, share recommendations,
          and explore a diverse range of genres, authors, and topics.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
