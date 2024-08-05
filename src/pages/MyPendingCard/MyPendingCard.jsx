import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import swal from "sweetalert";

const MyPendingCard = ({ getPending, unavailableIds, refetch, refetchIds }) => {
  const {
    _id,
    book_id,
    book_name,
    book_image,
    provider_email,
    user_email,
    user_phone,
    user_date,
    user_message,
    user_location,
    status,
    completed_at,
  } = getPending;

  const axiosSecure = useAxiosSecure();
  const [todayDateTime, setTodayDateTime] = useState("");

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
          swal({
            title: "Thank You!",
            text: `Updated to ${updatedPendingStatus}`,
            icon: "success",
            timer: 2000,
          });
          refetch();
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
              refetch();
              refetchIds();
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

  return (
    <div
      data-aos="zoom-in"
      className="group bg-base-100 shadow-xl rounded-xl pt-2 md:pt-3 py-5 flex flex-col"
    >
      <div className="flex-grow mb-2 text-lg px-2 text-center">
        <figure>
          <img
            src={book_image}
            onContextMenu={(e) => e.preventDefault()}
            className="rounded-xl w-[100px] h-[130px] mx-auto object-cover my-2"
          />
        </figure>
        <div className="group-hover:scale-105 group-hover:transition-all group-hover:duration-300">
          <h2 className="text-xl font-bold text-blue-900">{book_name}</h2>
          <h1>Collector Info: </h1>
          <p className="text-green-600">{user_phone}</p>
          <p className="text-purple-800">{user_email}</p>
          {user_message.length > 0 && <p>Message: {user_message}</p>}
          <p>Booked: {user_date}</p>
          {status === "Completed" && (
            <p>
              Completed: <span className="text-cyan-500">{completed_at}</span>
            </p>
          )}
          <p className="text-blue-500">Location: {user_location}</p>
        </div>
      </div>
      <div className="text-center mt-1">
        <select
          defaultValue={status}
          onChange={(e) => handleUpdateStatus(e, _id, book_id, provider_email)}
          className="border py-[6px] border-blue-500 focus:border-transparent rounded-xl"
          disabled={status === "Completed" || unavailableIds?.includes(book_id)}
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
