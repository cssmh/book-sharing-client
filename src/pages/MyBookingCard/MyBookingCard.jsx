import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const MyBookingCard = ({ getBooking, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosNoToken = useAxiosPublic();

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  const {
    _id,
    book_id,
    book_name,
    book_image,
    book_provider_email,
    book_provider_phone,
    user_date,
    status,
    completed_at,
  } = getBooking;

  const { data: bookData = [], refetch: reviewRefetch } = useQuery({
    queryKey: ["getBookData", book_id],
    queryFn: async () => {
      const res = await axiosNoToken.get(`/book/${book_id}`);
      return res?.data;
    },
  });

  const handleBookingDelete = (idx, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/booking/${idx}/${user?.email}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            Swal.fire({
              text: `Booking on ${name} Deleted!`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const { data: available = "" } = useQuery({
    queryKey: ["available", book_id],
    queryFn: async () => {
      const res = await axiosNoToken.get(`/book/${book_id}`);
      return res?.data?.book_status;
    },
  });

  const handleAddReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;
    const name = user?.displayName;
    axiosSecure
      .patch(`/add-review/${book_id}`, { review, name })
      .then((res) => {
        if (res.data?.acknowledged) {
          Swal.fire({
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
      className="bg-base-100 shadow-xl rounded-xl px-14 pt-2 md:pt-3 py-6 flex flex-col"
    >
      <div className="flex-grow pb-1">
        <figure>
          <img
            src={book_image}
            onContextMenu={(e) => e.preventDefault()}
            className="rounded-xl w-[38%] md:w-[50%] mx-auto my-2"
          />
        </figure>
        <p className="text-xl md:text-2xl">{book_name}</p>
        <div className="text-lg">
          <p className="text-xl">Provider Information</p>
          <p className="text-green-600">{book_provider_phone}</p>
          <p className="text-purple-800">{book_provider_email}</p>
          {available === "Unavailable" && status !== "Completed" ? (
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
            className="btn border-black bg-base-100 hover:bg-black text-black hover:text-white"
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
