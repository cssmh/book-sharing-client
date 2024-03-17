import swal from "sweetalert";

const AdminBookingCard = ({
  getAllBooking,
  adminBookings,
  setAdminBookings,
}) => {
  const {
    _id,
    book_image,
    book_name,
    book_provider_email,
    phone,
    status,
    date,
    user_email,
    buyerPhone,
  } = getAllBooking;

  const handleDelete = (idx) => {
    swal({
      title: "Check again if you want!",
      text: "Delete Confirm?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // main code
        fetch(`https://book-sharing-server.vercel.app/bookings/${idx}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              const remaining = adminBookings.filter(
                (book) => book._id !== idx
              );
              setAdminBookings(remaining);
              swal("Deleted!", {
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
    <div className="max-w-[1180px] mx-auto">
      <div className="flex justify-center items-center border border-green-500 p-5 rounded-lg">
        <div className="flex-1 text-center">
          <img
            src={book_image}
            className="w-36 rounded-md mx-auto mb-1"
            alt=""
          />
          <p className="md:text-[22px] font-bold text-cyan-500">{book_name}</p>
          <p className="md:text-lg">{book_provider_email}</p>
          <p className="text-lg text-green-500">{phone}</p>
        </div>
        <div className="flex-1 text-center md:text-lg">
          <p>Collector</p>
          <p className="text-lg">
            Status:{" "}
            <span
              className={
                status === "Pending" ? "text-red-500" : "text-green-500"
              }
            >
              {status}
            </span>
          </p>
          <p>
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
              {user_email}
            </span>
          </p>
          <p>{buyerPhone}</p>
          <p className="mb-1">{date}</p>
          <button
            onClick={() => handleDelete(_id)}
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
