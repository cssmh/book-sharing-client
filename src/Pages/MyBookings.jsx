import { motion } from "framer-motion";
import MyBookingCard from "./MyBookingCard";
import MyBookSke from "../Components/AllSkeleton/MyBookSke";
import useMyCart from "../Hooks/useMyCart";
import useIsLarge from "../Hooks/useIsLarge";
import { FaBuildingCircleExclamation } from "react-icons/fa6";

const MyBookings = () => {
  const cart = useIsLarge();
  const { isLoading, myBookings, refetch, error } = useMyCart();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(cart)].map((_, index) => (
          <MyBookSke key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <FaBuildingCircleExclamation className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600">
          An error occurred while fetching your bookings.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {myBookings?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="bg-gray-100 p-6 rounded-2xl inline-block mb-6">
            <FaBuildingCircleExclamation className="w-12 h-12 text-emerald-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Bookings Yet
          </h3>
          <p className="text-gray-600">
            You haven&apos;t made any bookings yet.
          </p>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              Your Bookings
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                {myBookings?.length} bookings
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {myBookings?.map((booking) => (
              <MyBookingCard
                key={booking._id}
                getBooking={booking}
                refetch={refetch}
              />
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default MyBookings;
