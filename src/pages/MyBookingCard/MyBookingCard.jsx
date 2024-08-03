import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useQueryPublic from "../../Hooks/useQueryPublic";
import ReviewModal from "./ReviewModal";

const MyBookingCard = ({ getBooking, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
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

  const { data: bookData = [], refetch: reviewRefetch } = useQueryPublic(
    ["getBookData", book_id],
    `/book/${book_id}`
  );

  const handleBookingDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosSecure.delete(`/booking/${_id}/${user?.email}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            swal("Booking Deleted!", { icon: "success", timer: 2000 });
            refetch();
          }
        });
      }
    });
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;
    const name = user?.displayName;
    axiosSecure
      .patch(`/add-review/${book_id}`, { review, name })
      .then((res) => {
        if (res.data?.acknowledged) {
          swal("Thank You", "Your review has been added.", {
            icon: "success",
            timer: 2000,
          });
          setIsOpen(false);
          reviewRefetch();
        }
      });
  };

  return (
    <div className="bg-base-100 shadow-lg border rounded-xl p-4 flex flex-col items-center space-y-3">
      <figure className="w-full flex justify-center">
        <img
          src={book_image}
          alt={book_name}
          onContextMenu={(e) => e.preventDefault()}
          className="rounded-xl w-[100px] h-[130px] object-cover"
        />
      </figure>
      <div className="text-center">
        <Link to={`/book/${book_id}`}>
          <h2 className="text-xl font-bold text-blue-900">{book_name}</h2>
        </Link>
        <p className="text-lg mt-1">Provider Info:</p>
        <p className="text-green-600">{provider_phone}</p>
        <p className="text-purple-800">{provider_email}</p>
        <p
          className={`text-base ${
            status === "Pending"
              ? "text-red-500"
              : status === "Completed"
              ? "text-green-500"
              : "text-blue-500"
          }`}
        >
          Status: {status}
        </p>
        <p className="text-base">Booked: {user_date}</p>
        {completed_at && (
          <p className="text-cyan-500">Completed: {completed_at}</p>
        )}
      </div>
      <div className="flex gap-2 mt-2">
        {status === "Completed" && !bookData?.user_review && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="bg-primary text-white py-2 px-4 rounded-md"
          >
            Add a Review
          </button>
        )}
        {status !== "Completed" && (
          <button
            onClick={handleBookingDelete}
            className="bg-red-500 text-white py-[5px] px-3 rounded-md"
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
