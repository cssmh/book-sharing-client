const BookingCard = ({ getAllBooking }) => {
  console.log(getAllBooking);
  const { book_image, book_name, book_provider_email, status, user_email } =
    getAllBooking;
  return (
    <div className="max-w-[1180px] mx-auto">
      <div className="flex justify-center items-center border border-green-500 p-5 rounded-lg">
        <div className="flex-1 text-center">
          <img
            src={book_image}
            className="w-36 rounded-md mx-auto mb-1"
            alt=""
          />
          <p className="text-[22px] font-bold text-cyan-500">{book_name}</p>
          <p className="text-lg">{book_provider_email}</p>
        </div>
        <div className="flex-1 text-center">
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
          <p className="mb-2">
            Collector:{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
              {user_email}
            </span>
          </p>
          <button className="mr-1 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Delete Book
          </button>
          <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Delete Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
