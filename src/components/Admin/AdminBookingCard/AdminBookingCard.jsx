import swal from "sweetalert";
import useAxiosHook from "../../../useCustomHook/useAxiosHook";

const AdminBookingCard = ({
  getAllBooking,
  adminBookings,
  setAdminBookings,
  filterAdminBookings,
  setFilterAdminBookings,
}) => {
  const {
    _id,
    book_image,
    book_name,
    book_provider_email,
    phone,
    status,
    date,
    book_purchaser_email,
    buyerPhone,
  } = getAllBooking;
  const { axiosNoToken } = useAxiosHook();

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
            const remainingAdminBookings = adminBookings.filter(
              (book) => book._id !== idx
            );
            setAdminBookings(remainingAdminBookings);
            const remainingFilterAdminBookings = filterAdminBookings.filter(
              (book) => book._id !== _id
            );
            setFilterAdminBookings(remainingFilterAdminBookings);
            swal("Booking Deleted!", {
              icon: "success",
            });
          }
        });
      } else {
        swal("File is safe!");
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center items-center border border-green-500 p-5 rounded-lg">
        <div className="flex-1 text-center">
          <img
            src={book_image}
            className="w-2/3 md:w-36 rounded-md mx-auto mb-1"
            alt="no image"
            onContextMenu={(e) => e.preventDefault()}
          />
          <p className="text-[22px] font-bold text-cyan-500">{book_name}</p>
          <p className="text-lg">{book_provider_email}</p>
          <p className="text-lg text-green-500 mb-2 md:mb-0">{phone}</p>
        </div>
        <div className="flex-1 text-center md:text-lg border-t-2  md:border-t-0 pt-2 md:pt-0">
          <p>Collector</p>
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
          <p className="text-blue-800">{book_purchaser_email}</p>
          <p>{buyerPhone}</p>
          <p className="mb-1">{date}</p>
          <button
            onClick={() => handleDeleteByAdmin(_id)}
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Delete Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingCard;
