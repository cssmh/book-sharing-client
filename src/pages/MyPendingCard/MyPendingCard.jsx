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
      className="group bg-white shadow-xl rounded-lg p-4 flex flex-col space-y-4"
    >
      <div className="flex flex-col items-center text-center space-y-2">
        <figure>
          <img
            src={book_image}
            onContextMenu={(e) => e.preventDefault()}
            className="rounded-lg w-[90px] h-[120px] object-cover"
          />
        </figure>
        <h2 className="text-lg font-semibold text-blue-900">{book_name}</h2>
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Collector Info</h3>
        <p className="text-sm text-gray-600">Phone: {user_phone}</p>
        <p className="text-sm text-gray-600">Email: {user_email}</p>
        {user_message.length > 0 && (
          <div className="bg-gray-100 rounded-md p-3 border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 text-left">
              Message
            </h4>
            <p className="text-sm text-gray-600 text-left">{user_message}</p>
          </div>
        )}
        <p className="text-sm text-gray-600">
          <span className="font-medium">Booked:</span> {user_date}
        </p>
        {status === "Completed" && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Completed:</span>{" "}
            <span className="text-cyan-500">{completed_at}</span>
          </p>
        )}
        <p className="text-sm text-gray-600">
          <span className="font-medium">Location:</span> {user_location}
        </p>
      </div>
      <div className="text-center">
        <select
          defaultValue={status}
          onChange={(e) => handleUpdateStatus(e, _id, book_id, provider_email)}
          className="border py-2 px-3 border-gray-300 rounded-lg text-sm focus:outline-none"
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
