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
  console.log(_id);

  const handleDelete = (idx, name) => {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
              const remaining = allBookings.filter((book) => book._id !== idx);
              setAllBookings(remaining);
              swal(`${name} Deleted!`, {
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
    <div className="card h-auto bg-yellow-50 hover:border hover:border-blue-700 hover:bg-yellow-50 shadow-xl mx-2 md:mx-4">
      <figure className="px-10 pt-5">
        <img src={book_image} alt="Books" className="rounded-xl h-72 md:h-64" />
      </figure>
      <div className="card-body items-center text-center mt-1 py-0">
        <h2 className="card-title font-bold text-blue-900">{book_name}</h2>
        <p className="text-lg font-bold ">
          Owner Phone & Email: <br></br>
          {phone} <br></br> {book_provider_email}
        </p>
        <p className="text-lg font-bold text-green-500">
          Status : <span>{status}</span>
        </p>
        <p className="text-lg font-bold ">Date of Handover: {date}</p>
      </div>
      <button
        onClick={() => handleDelete(_id, book_name)}
        className="btn mt-2 mb-4 w-2/5 mx-auto border-black bg-base-100 hover:bg-black text-black hover:text-white"
      >
        delete booking
      </button>
    </div>
  );
};

export default MyBookingCard;
