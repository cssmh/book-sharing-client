// Reviews.jsx (updated)
import { motion } from "framer-motion";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      content:
        "I am striving to improve the quality of services and books offered by this website. I am committed to attention to detail and excellence, aiming for unparalleled quality.",
      name: "Md. Momin Hossain",
      role: "Admin of BookHaven",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocKK0Zmiiw579ElRkNruYKcz5zPBQltI5ZNFwLgQv5x1142MveY=s288-c-no",
    },
    {
      id: 2,
      content:
        "Working with this web has been a pleasure. Their dedication to customer satisfaction is truly remarkable. I highly recommend their services.",
      name: "Tourist",
      role: "Happy Book Enthusiast",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocKbGz5rWOkxp_m2p8uaDy5j4qE3bm7PyHmv2C8_wiklM1kyYPVhYg=s288-c-no",
    },
    {
      id: 3,
      content:
        "The team at this web is not only professional but also incredibly friendly. They made our project a huge success and exceeded our expectations.",
      name: "Momen",
      role: "Lovely Book Purchaser",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocIKtdnufzB1CAfX6RDVomHy9udvurqYTawBgF1rn31A69kq5-w=s288-c-no",
    },
    {
      id: 4,
      content:
        "We have been partners with this web for years, and they have consistently delivered top-notch solutions. They truly understand our business needs.",
      name: "Mr. Tourist",
      role: "Best Provider & Reader",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocLoLEY-xqWOBY3CVJQ39IxgeH5Pmj1EqnbRJF1ynWiV6_iwx3uvDA=s288-c-no",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="container 2xl:max-w-[1370px] mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Hear from Our <span className="text-emerald-500">Book Community</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm">
          Discover the stories of satisfaction from our avid book lovers as they
          share their experiences with BookHaven.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 gap-6 lg:gap-8"
      >
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start mb-4">
              <div className="w-3 h-3 text-emerald-500 mt-1 mr-2">&rdquo;</div>
              <p className="text-gray-600 italic flex-1">{review.content}</p>
            </div>
            <div className="flex items-center">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
                onContextMenu={(e) => e.preventDefault()}
              />
              <div>
                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                <p className="text-gray-500 text-sm">{review.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Reviews;
