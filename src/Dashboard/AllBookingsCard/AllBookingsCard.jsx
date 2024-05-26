import swal from "sweetalert";
import useAxiosPublic from "../../Shared/useCustomHook/useAxiosPublic";

const AllBookingsCard = ({
  getIndex,
  getAllBooking,
  allBookStatus,
  allBookings,
  setAllBookings,
  filterAllBookings,
  setFilterAllBookings,
}) => {
  const {
    _id,
    book_name,
    book_image,
    book_provider_email,
    book_provider_phone,
    user_email,
    user_phone,
    status,
    completed_at,
  } = getAllBooking;

  const axiosNoToken = useAxiosPublic();
  const handleDeleteByAdmin = (idx) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // main code
        axiosNoToken.delete(`/booking/${idx}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            swal("Booking Deleted!", {
              icon: "success",
            });
            const remainingAllBookings = allBookings.filter(
              (book) => book._id !== idx
            );
            setAllBookings(remainingAllBookings);
            const remainingFilterBookings = filterAllBookings.filter(
              (book) => book._id !== _id
            );
            setFilterAllBookings(remainingFilterBookings);
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
            className="rounded-xl w-[120px] md:w-[130px] mx-auto mb-1"
            alt="no image"
            onContextMenu={(e) => e.preventDefault()}
          />
          <p className="text-[22px] font-bold text-cyan-500">{book_name}</p>
          <p className="text-lg">{book_provider_email}</p>
          <p className="text-lg text-green-500 mb-2 md:mb-0">
            {book_provider_phone}
          </p>
        </div>
        <div className="flex-1 text-center md:text-lg border-t-2 md:border-t-0 pt-2 md:pt-0 text-lg">
          <p>Collector</p>
          <p className="text-lg">
            Status:{" "}
            <span
              className={
                allBookStatus.length > 0
                  ? "text-red-500"
                  : status === "Pending"
                  ? "text-red-500"
                  : status === "Completed"
                  ? "text-green-500"
                  : "text-blue-500"
              }
            >
              {allBookStatus.length > 0 ? allBookStatus : status}
            </span>
          </p>
          <p>{completed_at}</p>
          <p className="text-blue-800">{user_email}</p>
          <p className="text-cyan-500 mb-1">{user_phone}</p>
          <button
            onClick={() => handleDeleteByAdmin(_id)}
            className="text-white bg-pink-500 font-medium rounded-lg text-sm px-4 py-2 text-center mx-2 md:mx-0"
          >
            Delete Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllBookingsCard;
