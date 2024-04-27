import swal from "sweetalert";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosHook from "../../useCustomHook/useAxiosHook";

const MyPendingCard = ({ getPending }) => {
  const {
    _id,
    book_id,
    book_name,
    book_image,
    book_provider_email,
    user_email,
    user_phone,
    user_date,
    user_message,
    status,
    completed_at,
  } = getPending;
  const { axiosSecure } = useAxiosHook();
  const [bookStatus, setBookStatus] = useState(status);
  const [todayDateTime, setTodayDateTime] = useState("");
  const [completed, setCompleted] = useState(completed_at);

  const handleUpdateStatus = (e, idx, bookIdx, email) => {
    const newStatus = e.target.value;
    const bookStatus =
      newStatus === "Pending" || newStatus === "Progress"
        ? "available"
        : "Unavailable";

    axiosSecure
      .put(`/bookings/${idx}/${email}`, { newStatus })
      .then((res) => {
        if (res.data?.modifiedCount > 0) {
          setBookStatus(newStatus);
          swal("Thank You!", `Updated to ${newStatus}`, "success");
        }
        if (newStatus === "Completed") {
          axiosSecure
            .patch(`/add-time/${idx}/${email}`, { todayDateTime })
            .then(() => setCompleted(todayDateTime))
            .catch();
        }
      })
      .then(() => {
        axiosSecure
          .put(`/book-status/${bookIdx}/${email}`, { bookStatus })
          .then()
          .catch((err) => {
            toast.error(err);
          });
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  // Set today's date and time for completed booking
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}-${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${today.getFullYear()}`;
    const formattedTime = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const dateTime = `${formattedDate}, ${formattedTime}`;
    setTodayDateTime(dateTime);
  }, []);
  // Set today's date and time for completed booking end

  return (
    <div
      data-aos="zoom-in"
      className="bg-base-100 shadow-xl rounded-xl pt-2 md:pt-3 py-6 flex flex-col"
    >
      <figure>
        <img
          src={book_image}
          onContextMenu={(e) => e.preventDefault()}
          className="rounded-xl w-1/2 mx-auto my-2"
        />
      </figure>
      <div className="mb-2 text-lg w-[73%] mx-auto">
        <h2 className="text-2xl">{book_name}</h2>
        <h1 className="text-xl">Collector Info: </h1>
        <p className="text-green-600">Phone: {user_phone}</p>
        <p className="text-purple-800">{user_email}</p>
        {user_message.length > 0 && <p>Message: {user_message}</p>}
        {bookStatus === "Completed" ? (
          <p>
            Booked: {user_date} Completed:{" "}
            <span className="text-cyan-500">{completed}</span>
          </p>
        ) : (
          <p>Booked: {user_date}</p>
        )}
      </div>
      <div className="text-center mt-1">
        <select
          id="book"
          name="book_name"
          defaultValue={status}
          onChange={(e) =>
            handleUpdateStatus(e, _id, book_id, book_provider_email)
          }
          className="border border-blue-500 focus:border-transparent rounded-2xl"
          disabled={bookStatus === "Completed"}
        >
          <option value="Pending">Pending</option>
          <option value="Progress">Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default MyPendingCard;
