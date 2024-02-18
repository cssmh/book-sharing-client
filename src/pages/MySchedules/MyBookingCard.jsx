const MyBookingCard = ({ booking }) => {
  // console.log(booking);
  const { book_image, book_name, phone, status, date, book_provider_email } =
    booking;
  // My Booking page card

  return (
    <div className="card h-auto bg-yellow-50 hover:border hover:border-blue-700 hover:bg-yellow-50 shadow-xl mx-2 md:mx-0">
      <figure className="px-10 pt-8">
        <img src={book_image} alt="Books" className="rounded-xl h-72 md:h-64" />
      </figure>
      <div className="card-body items-center text-center">
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
    </div>
  );
};

export default MyBookingCard;
