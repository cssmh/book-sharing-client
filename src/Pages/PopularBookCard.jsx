// PopularBookCard.jsx (updated)
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PopularBookCard = ({ getBook }) => {
  const {
    _id,
    book_name,
    book_image,
    provider_image,
    provider_name,
    provider_phone,
    provider_location,
    description,
  } = getBook;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={book_image}
          alt={book_name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          Latest
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {book_name}
        </h3>
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {description}
        </p>

        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md mr-3">
            <img
              src={provider_image}
              alt={provider_name}
              className="w-full h-full object-cover"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <div>
            <p className="font-medium text-gray-900">{provider_name}</p>
            <p className="text-sm text-gray-500">{provider_location}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <Link
            to={`/book/${book_name
              .toLowerCase()
              .replaceAll(/\s+/g, "_")}/${_id}`}
            className="text-emerald-500 hover:text-emerald-600 font-medium flex items-center"
          >
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          <a
            href={`tel:${provider_phone}`}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-full transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default PopularBookCard;
