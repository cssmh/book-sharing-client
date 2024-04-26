import swal from "sweetalert";
import { useState } from "react";
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
  } = getPending;
  const { axiosSecure } = useAxiosHook();
  const [bookStatus, setBookStatus] = useState(status);

  const handleUpdateStatus = (e, idx, bookIdx, email) => {
    const newStatus = e.target.value;
    const bookStatus =
      newStatus === "Pending" || newStatus === "Progress"
        ? "available"
        : "Unavailable";

    const updatedStatus = { bookStatus };

    axiosSecure
      .put(`/bookings/${idx}/${email}`, { newStatus })
      .then((res) => {
        if (res.data?.modifiedCount > 0) {
          setBookStatus(newStatus);
          swal("Thank You!", `Updated to ${newStatus}`, "success");
        }
      })
      .then(() => {
        axiosSecure
          .put(`/book-status/${bookIdx}/${email}`, updatedStatus)
          .catch((err) => {
            toast.error(err);
          });
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div
      data-aos="zoom-in"
      className="bg-base-100 shadow-xl rounded-xl pt-2 md:pt-3 py-6 flex flex-col"
    >
      <figure>
        <img
          src={book_image}
          onContextMenu={(e) => e.preventDefault()}
          className="rounded-xl w-1/2 mx-auto my-3"
        />
      </figure>
      <h2 className="text-2xl text-blue-900 text-center mt-2 mb-1 px-2">
        {book_name}
      </h2>
      <h1 className="text-xl text-center">Collector Info: </h1>
      <div className="mb-2 text-lg w-2/3 mx-auto">
        <p className="text-green-500">Phone: {user_phone}</p>
        <p className="text-yellow-800">{user_email}</p>
        {user_message.length > 0 && <p>Message: {user_message}</p>}
        <p>
          Booking Date: <span className="text-blue-500">{user_date}</span>
        </p>
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
