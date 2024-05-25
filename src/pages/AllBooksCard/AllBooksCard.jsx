import { Link } from "react-router-dom";
const AllBooksCard = ({ getBook }) => {
  const {
    _id,
    book_image,
    book_name,
    book_provider_image,
    book_provider_name,
    book_provider_phone,
    provider_location,
    description,
  } = getBook;

  return (
    <div className="card bg-base-100 shadow-xl py-4 hover:scale-105 transition-all duration-300">
      <figure>
        <img
          data-aos="zoom-in"
          data-aos-duration="700"
          data-aos-offset="100"
          src={book_image}
          alt="book"
          onContextMenu={(e) => e.preventDefault()}
          className="rounded-xl w-[27%] md:w-[36%]"
        />
      </figure>
      <div className="card-body items-center text-center p-0 px-3 gap-[0px]">
        <h2 className="text-blue-900 text-xl md:text-2xl font-bold mt-2 px-1">
          {book_name}
        </h2>
        <p className="px-5">{description?.slice(0, 90)}...</p>
        <div className="flex justify-center items-center gap-3 my-1 border-2 border-red-400 rounded-lg px-3 py-2">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary">
              <img
                src={book_provider_image}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
          <h2 className="font-bold text-lg">{book_provider_name}</h2>
        </div>
        <p className="text-lg text-green-500">Phone: {book_provider_phone}</p>
        <p className="text-lg">Location: {provider_location}</p>
        <div className="card-actions mt-2">
          <Link to={`/book/${_id}`}>
            <button className="btn border-green-400 hover:border-green-400 bg-yellow-50 hover:bg-green-400 text-green-400 hover:text-white">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllBooksCard;
