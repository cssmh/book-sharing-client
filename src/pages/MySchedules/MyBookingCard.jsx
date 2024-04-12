import axios from "axios";
import swal from "sweetalert";

const MyBookingCard = ({ getBooking, allBookings, setAllBookings }) => {
  // console.log(getBooking);
  const {
    _id,
    book_image,
    book_name,
    phone,
    status,
    date,
    book_provider_email,
  } = getBooking;

  const handleBookingDelete = (idx) => {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // main code
        axios.delete(`https://book-sharing-server.vercel.app/booking/${idx}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            const remaining = allBookings.filter((book) => book._id !== idx);
            setAllBookings(remaining);
            swal("Deleted!", {
              icon: "success",
            });
          }
        });
      } else {
        swal("Your file is safe!");
      }
    });
  };

  return (
    <div
      data-aos="zoom-in"
      className="bg-base-100 shadow-xl rounded-xl px-14 pt-3 py-6 flex flex-col"
    >
      <div className="flex-grow">
        <figure>
          <img
            src={book_image}
            onContextMenu={(e) => e.preventDefault()}
            className="rounded-xl w-[60%] mx-auto my-2"
          />
        </figure>
        <p className="text-2xl">{book_name}</p>
        <div className="text-lg">
          <p>Provider Information:</p>
          <p className="text-green-600">{phone}</p>
          <p className="text-purple-800">{book_provider_email}</p>
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
          <p>
            Required Date: <span className="text-blue-500">{date}</span>
          </p>
        </div>
      </div>
      <div className="mt-2 card-actions justify-center">
        <button
          onClick={() => handleBookingDelete(_id)}
          className="btn border-black bg-base-100 hover:bg-black text-black hover:text-white"
        >
          Delete Booking
        </button>
      </div>
    </div>
  );
};

export default MyBookingCard;
