import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import MyBookSke from "../Components/AllSkeleton/MyBookSke";
import useDataQuery from "../Hooks/useDataQuery";
import MyPendingCard from "./MyPendingCard";
import useIsLarge from "../Hooks/useIsLarge";
import { FaBuildingCircleExclamation } from "react-icons/fa6";

const MyPending = () => {
  const cart = useIsLarge();
  const { loading, user } = useAuth();
  const url = `/providers-books?email=${user?.email}`;

  const { isLoading: myBooksLoading, data: bookData = [] } = useDataQuery(
    ["myBooks"],
    url
  );

  const idUrl = `/unavailable-ids?email=${user?.email}`;
  const {
    isLoading: idLoading,
    data: unavailableIds = [],
    refetch: refetchIds,
  } = useDataQuery(
    ["unavailableIds", user?.email],
    idUrl,
    !loading && !!user?.email
  );

  const pendingUrl = `/my-pending?email=${user?.email}`;
  const {
    isLoading,
    error,
    data: allMyPending = [],
    refetch,
  } = useDataQuery(
    ["myPending", user?.email],
    pendingUrl,
    !loading && !!user?.email
  );

  if (idLoading || myBooksLoading || isLoading) {
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
          An error occurred while fetching your pending requests.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {bookData.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="bg-gray-100 p-6 rounded-2xl inline-block mb-6">
            <FaBuildingCircleExclamation className="w-12 h-12 text-emerald-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Books Added
          </h3>
          <p className="text-gray-600">
            You haven&apos;t added any books to share yet.
          </p>
        </motion.div>
      ) : allMyPending?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="bg-gray-100 p-6 rounded-2xl inline-block mb-6">
            <FaBuildingCircleExclamation className="w-12 h-12 text-emerald-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Pending Requests
          </h3>
          <p className="text-gray-600">
            No one has requested to borrow your books yet.
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
              Pending Requests
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                {allMyPending?.length} requests
              </span>
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Manage booking requests for your books
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {allMyPending?.map((pending) => (
              <MyPendingCard
                key={pending._id}
                getPending={pending}
                unavailableIds={unavailableIds}
                refetch={refetch}
                refetchIds={refetchIds}
              />
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default MyPending;
