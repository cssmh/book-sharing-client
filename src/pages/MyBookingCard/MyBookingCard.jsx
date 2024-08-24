import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../../Hooks/useAuth";
import ReviewModal from "../../Components/Modal/ReviewModal";
import { deleteBooking } from "../../Api/Delete";
import { addReview } from "../../Api/bookings";
import useDataQuery from "../../Hooks/useDataQuery";

const MyBookingCard = ({ getBooking, refetch }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
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
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (willDelete) {
      const res = await deleteBooking(_id, user?.email);
      if (res.deletedCount > 0) {
        swal("Booking Deleted!", { icon: "success", timer: 2000 });
        refetch();
      }
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    const review = e.target.review.value;
    const name = user?.displayName;
    const res = await addReview(book_id, review, name);
    if (res?.acknowledged) {
      swal("Thank You", "Your review has been added.", {
        icon: "success",
        timer: 2000,
      });
      setIsOpen(false);
      reviewRefetch();
    }
  };

  return (
    <div className="group bg-white shadow-lg rounded-xl p-5 flex flex-col items-center space-y-3">
      <div className="flex-grow">
        <figure className="w-full flex justify-center">
          <img
            src={book_image}
            alt={book_name}
            onContextMenu={(e) => e.preventDefault()}
            className="rounded-lg w-[100px] h-[130px] object-cover"
          />
        </figure>
        <div className="text-center px-4 group-hover:scale-105 group-hover:transition-transform group-hover:duration-300">
          <Link
            to={`/book/${book_name
              .toLowerCase()
              .replaceAll(/\s+/g, "_")}/${_id}`}
          >
            <h2 className="text-lg font-semibold text-blue-900 mt-2">
              {book_name}
            </h2>
          </Link>
          <p className="text-lg font-medium text-gray-700">Provider Info:</p>
          <p className="text-sm text-green-600">{provider_phone}</p>
          <p className="text-sm">{provider_email}</p>
          <p className="text-sm text-gray-600 mt-2">Booked: {user_date}</p>
          <p
            className={`text-sm mt-1 ${
              status === "Pending"
                ? "text-red-500"
                : status === "Completed"
                ? "text-green-500"
                : "text-blue-500"
            }`}
          >
            Status: {status}
          </p>
          {completed_at && (
            <p className="text-sm text-cyan-500 mt-1">
              <span className="font-medium">Completed:</span> {completed_at}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        {status === "Completed" && !bookData?.user_review && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="bg-primary outline-none text-white py-1 px-3 rounded-md shadow-sm"
          >
            Add a Review
          </button>
        )}
        {status !== "Completed" && (
          <button
            onClick={handleBookingDelete}
            className="bg-red-500 text-white py-[6px] px-3 rounded-xl shadow-sm"
          >
            Delete Booking
          </button>
        )}
      </div>
      <ReviewModal
        closeModal={() => setIsOpen(false)}
        book_name={book_name}
        isOpen={isOpen}
        handleAddReview={handleAddReview}
      />
    </div>
  );
};

export default MyBookingCard;
