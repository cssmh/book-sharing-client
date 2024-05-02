import swal from "sweetalert";
import useAxiosHook from "../../useCustomHook/useAxiosHook";
import { useEffect, useState } from "react";

const MyBookingCard = ({ getBooking, allBookings, setAllBookings }) => {
  const { axiosNoToken } = useAxiosHook();
  const [available, setAvailable] = useState("");
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

  const handleBookingDelete = (idx) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosNoToken.delete(`/booking/${idx}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            const remaining = allBookings.filter((book) => book._id !== idx);
            setAllBookings(remaining);
            swal("Deleted!", {
              icon: "success",
            });
          }
        });
      } else {
        swal("Your file is safe!");
      }
    });
  };

  useEffect(() => {
    axiosNoToken
      .get(`/book/${book_id}`)
      .then((res) => setAvailable(res.data?.book_status));
  }, [book_id, axiosNoToken]);
  
  return (
    <div
      data-aos="zoom-in"
      className="bg-base-100 shadow-xl rounded-xl px-14 pt-2 md:pt-3 py-6 flex flex-col"
    >
      <div className="flex-grow">
        <figure>
          <img
            src={book_image}
            onContextMenu={(e) => e.preventDefault()}
            className="rounded-xl w-[60%] mx-auto my-2"
          />
        </figure>
        <p className="text-2xl">{book_name}</p>
        <div className="text-lg">
          <p className="text-xl">Provider Information</p>
          <p className="text-green-600">{book_provider_phone}</p>
          <p className="text-purple-800">{book_provider_email}</p>
          {available === "Unavailable" && status !== "Completed" ? (
            <p className="text-red-700">Sorry! got by someone else!</p>
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
      {status !== "Completed" && (
        <div className="mt-2 card-actions justify-center">
          <button
            onClick={() => handleBookingDelete(_id)}
            className="btn border-black bg-base-100 hover:bg-black text-black hover:text-white"
          >
            Delete Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBookingCard;
