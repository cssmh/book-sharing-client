import axios from "axios";
import swal from "sweetalert";

const MyBookingCard = ({ getBooking, allBookings, setAllBookings }) => {
  // console.log(booking);
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
        axios.delete(`https://book-sharing-server.vercel.app/bookings/${idx}`).then((res) => {
          if (res?.data?.deletedCount > 0) {
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
    <div data-aos="zoom-in" className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={book_image}
          alt="book"
          className="rounded-xl w-1/2 mt-2"
        />
      </figure>
      <div className="px-14 pt-3 pb-5">
        <p className="text-2xl">{book_name}</p>
        <div className="text-lg">
          <p>Owner Information:</p>
          <p className="text-green-500">{phone}</p>
          <p className="text-yellow-700">{book_provider_email}</p>
          <p>
            Status: <span className="text-green-500">{status}</span>
          </p>
          <p>
            Date of Handover: <span className="text-blue-500">{date}</span>
          </p>
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
    </div>
  );
};

export default MyBookingCard;
