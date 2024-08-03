import swal from "sweetalert";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useQueryPublic from "../../Hooks/useQueryPublic";
import { Link } from "react-router-dom";

const MyBookingCard = ({ getBooking, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

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

  const handleBookingDelete = (idx, name) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosSecure.delete(`/booking/${idx}/${user?.email}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            swal(`Booking on ${name} Deleted!`, {
              icon: "success",
              timer: 2000,
            });
            refetch();
          }
        });
      }
    });
  };

  const { data } = useQueryPublic(["available", book_id], `/book/${book_id}`);

  const handleAddReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;
    const name = user?.displayName;
    axiosSecure
      .patch(`/add-review/${book_id}`, { review, name })
      .then((res) => {
        if (res.data?.acknowledged) {
          swal({
            title: "Thank You",
            text: "Your review has been added.",
            icon: "success",
            timer: 2000,
          });
          setIsOpen(false);
          reviewRefetch();
        }
      });
  };

  return (
    <div
      data-aos="zoom-in"
      className="bg-base-100 shadow-lg border rounded-xl px-5 pt-2 md:pt-3 py-6 flex flex-col"
    >
      <div className="flex-grow pb-1">
        <figure>
          <img
            src={book_image}
            onContextMenu={(e) => e.preventDefault()}
            className="rounded-xl w-[25%] md:w-[30%] mx-auto my-2"
          />
        </figure>
        <Link to={`/book/${book_id}`}>
          <p className="text-xl">{book_name}</p>
        </Link>
        <div className="text-lg">
          <p>Provider Information</p>
          <p className="text-green-600">{provider_phone}</p>
          <p className="text-purple-800">{provider_email}</p>
          {data?.book_status === "Unavailable" && status !== "Completed" ? (
            <p className="text-red-700">Sorry, taken by someone else!</p>
          ) : (
            <p>
              Status:{" "}
              <span
                className={
                  status === "Pending"
                    ? "text-red-500"
                    : status === "Completed"
                    ? "text-green-500"
                    : "text-blue-500"
                }
              >
                {status}
              </span>
            </p>
          )}
          <p>Booked: {user_date}</p>
          {completed_at && (
            <p>
              Completed: <span className="text-cyan-500">{completed_at}</span>
            </p>
          )}
        </div>
      </div>
      {status === "Completed" ? (
        !bookData?.user_review && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="bg-primary py-2 rounded-xl text-white mt-1"
          >
            Add a Review
          </button>
        )
      ) : (
        <div className="mt-2 card-actions justify-center">
          <button
            onClick={() => handleBookingDelete(_id, book_name)}
            className="border border-gray-300 px-2 py-1 rounded-lg bg-base-100 hover:bg-black text-black hover:text-white"
          >
            Delete Booking
          </button>
        </div>
      )}
      <ReviewModal
        closeModal={closeModal}
        book_name={book_name}
        isOpen={isOpen}
        handleAddReview={handleAddReview}
      ></ReviewModal>
    </div>
  );
};

export default MyBookingCard;
