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
  // console.log(_id);

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
        fetch(`http://localhost:5000/bookings/${idx}`, {
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
    // <div className="card bg-yellow-50 hover:border hover:border-blue-700 hover:bg-yellow-50 shadow-xl mx-2 md:mx-4">
    //   <figure className="px-10 pt-5">
    //     <img src={book_image} alt="Books" className="rounded-xl h-72 md:h-64" />
    //   </figure>
    //   <div className="items-center my-1 py-0 w-[70%] mx-auto">
    //     <h2 className="text-2xl text-blue-900">{book_name}</h2>
    //     <div className="text-lg">
    //       <p className="">Owner Information:</p>
    //       <div className="text-left text-lg">
    //         <p>{book_provider_email}</p>
    //         <p>{phone}</p>
    //         <p className="text-green-500">Status: {status}</p>
    //         <p>Date of Handover: {date}</p>
    //       </div>
    //     </div>
    //   </div>
    //   <button
    //     onClick={() => handleDelete(_id, book_name)}
    //     className="btn mt-2 mb-4 w-2/5 mx-auto border-black bg-base-100 hover:bg-black text-black hover:text-white"
    //   >
    //     delete booking
    //   </button>
    // </div>
    <div data-aos="zoom-in" className="card bg-base-100 shadow-xl">
      <figure>
        <img src={book_image} alt="book" className="rounded-xl w-1/2 mt-5" />
      </figure>
      <div className="px-14 pt-3 pb-5">
        <p className="text-2xl">{book_name}</p>
        <p>Owner Information:</p>
        <p className="text-green-500">{phone}</p>
        <p className="text-yellow-700">{book_provider_email}</p>
        <p>
          Status: <span className="text-green-500">{status}</span>
        </p>
        <p>
          Date of Handover: <span className="text-blue-500">{date}</span>
        </p>
        <div className="mt-2 card-actions justify-center">
          <button
            onClick={() => handleDelete(_id)}
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
