import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import useAuth from "../Hooks/useAuth";
import ReviewModal from "../Components/Modal/ReviewModal";
import { deleteBooking } from "../Api/Delete";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { addReview } from "../Api/bookings";
import { FaTrashAlt } from "react-icons/fa";
import useDataQuery from "../Hooks/useDataQuery";
import { motion } from "framer-motion";

const MyBookingCard = ({ getBooking, refetch }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const {
    _id,
    book_id,
    book_name,
    book_image,
    provider_email,
    provider_phone,
    user_date,
    status,
    completed_at,
  } = getBooking;

  const { data: bookData = [], refetch: reviewRefetch } = useDataQuery(
    ["getBookData", book_id],
    `/book/${book_id}`
  );

  const handleBookingDelete = async () => {
    const res = await deleteBooking(_id, user?.email);
    if (res.deletedCount > 0) {
      setIsDeleteConfirmOpen(false);
      refetch();
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    const review = e.target.review.value;
    const name = user?.displayName;
    const res = await addReview(book_id, review, name);
    if (res?.acknowledged) {
      setIsOpen(false);
      reviewRefetch();
    }
  };

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Progress: "bg-blue-100 text-blue-800",
    Completed: "bg-emerald-100 text-emerald-800",
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 p-6 transition-all duration-200"
      >
        <div className="flex flex-col items-center space-y-4">
          {/* Book Image */}
          <Link
            to={`/book/${book_name
              .toLowerCase()
              .replaceAll(/\s+/g, "_")}/${book_id}`}
            className="group"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={book_image}
                alt={book_name}
                onContextMenu={(e) => e.preventDefault()}
                className="w-32 h-40 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-lg" />
            </div>
          </Link>

          {/* Book Info */}
          <div className="text-center space-y-3 w-full">
            <Link
              to={`/book/${book_name
                .toLowerCase()
                .replaceAll(/\s+/g, "_")}/${book_id}`}
            >
              <h3 className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2">
                {book_name}
              </h3>
            </Link>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center gap-2">
                <span className="font-medium text-gray-600">Provider:</span>
                <span className="text-emerald-600">{provider_phone}</span>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="font-medium text-gray-600">Booked:</span>
                <span className="text-gray-600">{user_date}</span>
              </div>

              {completed_at && (
                <div className="flex items-center justify-center gap-2">
                  <span className="font-medium text-gray-600">Completed:</span>
                  <span className="text-cyan-600">{completed_at}</span>
                </div>
              )}

              <div className="flex justify-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
                >
                  {status}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 w-full">
            {status === "Completed" && !bookData?.user_review && (
              <button
                onClick={() => setIsOpen(true)}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <IoChatbubbleEllipses className="w-4 h-4" />
                Review
              </button>
            )}
            {status !== "Completed" && (
              <button
                onClick={() => setIsDeleteConfirmOpen(true)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <FaTrashAlt className="w-4 h-4" />
                Cancel
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Review Modal */}
      <ReviewModal
        closeModal={() => setIsOpen(false)}
        book_name={book_name}
        isOpen={isOpen}
        handleAddReview={handleAddReview}
      />

      {/* Delete Confirmation Modal */}
      <Dialog
        open={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm bg-white rounded-xl p-6 shadow-xl">
            <Dialog.Title className="text-lg font-bold text-gray-900 mb-2">
              Cancel Booking
            </Dialog.Title>
            <Dialog.Description className="text-gray-600 mb-6">
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </Dialog.Description>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Keep It
              </button>
              <button
                onClick={handleBookingDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel Booking
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MyBookingCard;
