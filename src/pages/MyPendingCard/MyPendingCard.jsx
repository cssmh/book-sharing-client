import swal from "sweetalert";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Shared/useCustomHook/useAxiosSecure";

const MyPendingCard = ({ getPending, completedBookIds, handleComplete }) => {
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
    user_location,
    status,
    completed_at,
  } = getPending;

  const axiosSecure = useAxiosSecure();
  const [myPendingStatus, setMyPendingStatus] = useState(status);
  const [todayDateTime, setTodayDateTime] = useState("");
  const [completedAt, setCompletedAt] = useState(completed_at);

  const handleUpdateStatus = (e, idx, book_id, provider_email) => {
    const updatedPendingStatus = e.target.value;
    const bookStatus =
      updatedPendingStatus === "Pending" || updatedPendingStatus === "Progress"
        ? "available"
        : "Unavailable";

    axiosSecure
      .put(`/booking-status/${idx}/${provider_email}`, {
        updatedPendingStatus,
      })
      .then((res) => {
        if (res.data?.modifiedCount > 0) {
          swal("Thank You!", `Updated to ${updatedPendingStatus}`, "success");
          setMyPendingStatus(updatedPendingStatus);
        }
        axiosSecure
          .put(`/book-status/${book_id}/${provider_email}`, { bookStatus })
          .then()
          .catch((err) => {
            toast.error(err);
          });
        if (updatedPendingStatus === "Completed") {
          axiosSecure
            .put(`/add-time/${idx}/${provider_email}`, { todayDateTime })
            .then(() => {
              setCompletedAt(todayDateTime);
              setMyPendingStatus(updatedPendingStatus);
              // Notify parent that this book_id is completed
              handleComplete(book_id);
            })
            .catch();
        }
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

  // Check if this book_id is completed
  const isCompleted = completedBookIds.includes(book_id);

  return (
    <div
      data-aos="zoom-in"
      className="bg-base-100 shadow-xl rounded-xl pt-2 md:pt-3 py-6 flex flex-col"
    >
      <div className="flex-grow mb-2 text-lg w-[73%] mx-auto">
        <figure>
          <img
            src={book_image}
            onContextMenu={(e) => e.preventDefault()}
            className="rounded-xl w-[38%] md:w-[50%] mx-auto my-2"
          />
        </figure>
        <h2 className="text-xl md:text-2xl">{book_name}</h2>
        <h1 className="text-xl">Collector Info: </h1>
        <p className="text-green-600">{user_phone}</p>
        <p className="text-purple-800">{user_email}</p>
        {user_message.length > 0 && <p>Message: {user_message}</p>}
        {myPendingStatus === "Completed" ? (
          <p>
            Booked: {user_date} Completed:{" "}
            <span className="text-cyan-500">{completedAt}</span>
          </p>
        ) : (
          <p>Booked: {user_date}</p>
        )}
        <p className="text-blue-500">Location: {user_location}</p>
      </div>
      <div className="text-center mt-1">
        <select
          defaultValue={myPendingStatus}
          onChange={(e) =>
            handleUpdateStatus(e, _id, book_id, book_provider_email)
          }
          className="border border-blue-500 focus:border-transparent rounded-2xl"
          // Disable if completed or if this book_id is completed
          disabled={myPendingStatus === "Completed" || isCompleted}
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
