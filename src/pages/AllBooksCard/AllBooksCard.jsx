import { Link } from "react-router-dom";
const AllBooksCard = ({ getBook }) => {
  const {
    _id,
    book_image,
    book_name,
    description,
    book_provider_image,
    book_provider_name,
    phone,
    location,
  } = getBook;

  return (
    <div className="card bg-base-100 shadow-xl py-4">
      <figure>
        <img
          data-aos="zoom-in"
          data-aos-delay="400"
          data-aos-offset="100"
          src={book_image}
          alt="books"
          className="rounded-xl w-1/2 lg:h-[270px]"
        />
      </figure>
      <div className="card-body items-center text-center p-0 px-3 gap-1">
        <h2 className="text-blue-900 text-[24px] font-bold mt-2 px-1">
          {book_name}
        </h2>
        <p className="px-2">Details: {description.slice(0, 135)}...</p>
        <div className="flex justify-center items-center gap-3 my-1 border-2 border-red-400 rounded-lg px-3 py-2">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary">
              <img src={book_provider_image} />
            </div>
          </div>
          <h2 className="font-bold text-lg">{book_provider_name}</h2>
        </div>
        <p className="text-lg text-green-500">Phone: {phone}</p>
        <p className="text-lg">Location: {location}</p>
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
