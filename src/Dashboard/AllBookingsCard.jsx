import useAuth from "../Hooks/useAuth";
import swal from "sweetalert";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const AllBookingsCard = ({ getIndex, getAllBooking, refetch }) => {
  const {
    _id,
    book_id,
    book_name,
    book_image,
    provider_email,
    provider_phone,
    user_email,
    user_phone,
    status,
    completed_at,
  } = getAllBooking;

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const handleDeleteByAdmin = (idx) => {
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
            swal("Booking Deleted!", {
              icon: "success",
              timer: 2000,
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center items-center border border-green-500 p-4 rounded-lg">
        <p className="mb-1 md:mb-0">{getIndex}.</p>
        <div className="flex-1 text-center">
          <img
            src={book_image}
            className="rounded-xl w-[85px] mx-auto mb-1"
            alt="no image"
            onContextMenu={(e) => e.preventDefault()}
          />
          <Link to={`/book/${book_id}`}>
            <p className="text-blue-900 text-lg font-bold mt-2 px-2">
              {book_name}
            </p>
          </Link>
          <p className="text-lg text-gray-500">{provider_email}</p>
          <p className="text-lg text-green-500 font-semibold mb-2 md:mb-0">
            {provider_phone}
          </p>
        </div>
        <div className="flex-1 text-center md:text-lg border-t-2 md:border-t-0 pt-2 md:pt-0 text-lg">
          <p>Collector Info</p>
          <p className="text-lg">
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
          {completed_at && <p>com {completed_at}</p>}
          <p className="text-gray-500">{user_email}</p>
          <p className="text-cyan-500 mb-1 text-base">{user_phone}</p>
          <button
            onClick={() => handleDeleteByAdmin(_id)}
            className="text-white bg-red-500 font-medium rounded-lg text-sm px-4 py-2 text-center mx-2 md:mx-0"
          >
            Delete Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllBookingsCard;
