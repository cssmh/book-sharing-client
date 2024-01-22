const MyBookingCard = ({booking}) => {
    console.log(booking);
    const {book_image,book_name,phone,status,date, book_provider_email} = booking;
    // let smallDesc;
    // description.length > 50 ? smallDesc = description.slice(0, 48) : description

    // My Booking page card

    return (
        <div className="card  bg-yellow-50 hover:border-2  hover:border-blue-700 hover:bg-yellow-100 shadow-xl">
        <figure className="px-10 pt-10">
            <img src={book_image} alt="Books" className="rounded-xl h-52" />
        </figure>
        <div className="card-body items-center text-center">
           <h2 className="card-title font-bold text-blue-900">{book_name}</h2>
           <p className="text-lg font-bold ">Owner Phone & Email: <br></br>
           {phone} <br></br> {book_provider_email}</p>
           <p className="text-lg font-bold text-green-500">Status : <span>{status}</span></p>
           <p className="text-lg font-bold ">Date of Handover: {date}</p>
        </div>
    </div>
    );
};

export default MyBookingCard;