import swal from "sweetalert";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router-dom";
import { deleteBooking } from "../Api/Delete";

const AllBookingsCard = ({ getIndex, getAllBooking, refetch }) => {
  const { user } = useAuth();
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

  const handleDeleteByAdmin = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (willDelete) {
      const res = await deleteBooking(id, user?.email);
      if (res.deletedCount > 0) {
        swal("Booking Deleted!", {
          icon: "success",
          timer: 2000,
        });
        refetch();
      }
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center md:items-start gap-4">
      <p className="text-lg font-medium">{getIndex}.</p>
      <div className="flex-1 text-center">
        <img
          src={book_image}
          className="rounded-lg w-24 h-[105px] object-cover mx-auto"
          alt={book_name}
        />
        <Link to={`/book/${book_id}`}>
          <p className="text-blue-900 text-lg font-semibold mt-2">
            {book_name}
          </p>
        </Link>
        <p className="text-gray-700">{provider_email}</p>
        <p className="text-green-600 font-semibold">{provider_phone}</p>
      </div>
      <div className="flex-1 text-center border-t border-gray-300 pt-4 md:pt-0 md:border-t-0 md:border-l md:pl-4">
        <p className="text-lg font-semibold mb-2">Collector Info</p>
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
        {completed_at && (
          <p className="text-gray-600">Completed At: {completed_at}</p>
        )}
        <p className="text-gray-600">{user_email}</p>
        <p className="text-cyan-600">{user_phone}</p>
        <button
          onClick={() => handleDeleteByAdmin(_id)}
          className="mt-2 bg-red-500 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-600 transform active:translate-y-0.5 transition-transform duration-150 ease-in-out"
        >
          Delete Booking
        </button>
      </div>
    </div>
  );
};

export default AllBookingsCard;
