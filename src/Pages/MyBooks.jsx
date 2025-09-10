import { motion } from "framer-motion";
import MyBooksCard from "./MyBooksCard";
import useAuth from "../Hooks/useAuth";
import MyBookSke from "../Components/AllSkeleton/MyBookSke";
import useDataQuery from "../Hooks/useDataQuery";
import HavenHelmet from "../Components/HavenHelmet";
import { HiMiniArrowPath } from "react-icons/hi2";
import useIsLarge from "../Hooks/useIsLarge";
import { FaBuildingCircleExclamation } from "react-icons/fa6";

const MyBooks = () => {
  const { user } = useAuth();
  const cart = useIsLarge();
  const url = `/providers-books?email=${user?.email}`;
  const {
    isLoading,
    data: bookData = [],
    error,
    refetch,
  } = useDataQuery(["myBooks"], url);

  if (isLoading)
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(cart)].map((_, index) => (
            <MyBookSke key={index} />
          ))}
        </div>
      </div>
    );

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col justify-center items-center min-h-[50vh] text-center"
      >
        <FaBuildingCircleExclamation className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-600 mb-4">
          An error occurred while fetching your books.
        </p>
        <button
          onClick={refetch}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <HiMiniArrowPath className="w-5 h-5" />
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <HavenHelmet title="My Books" />

      {bookData?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col justify-center items-center min-h-[50vh] text-center"
        >
          <div className="bg-gray-100 p-6 rounded-2xl mb-6">
            <FaBuildingCircleExclamation className="w-12 h-12 text-emerald-500 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Books Added Yet
          </h3>
          <p className="text-gray-600">
            You haven&apos;t added any books to your collection.
          </p>
        </motion.div>
      ) : (
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              Your Book Collection
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                {bookData?.length} books
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {bookData.map((book) => (
              <MyBooksCard key={book._id} getBook={book} refetch={refetch} />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
