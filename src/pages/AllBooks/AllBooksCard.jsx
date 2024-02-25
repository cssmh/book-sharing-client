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
    <div className="card bg-yellow-50 hover:border hover:border-blue-700 mx-2 md:mx-0 space-y-2 py-5">
      <div data-aos="zoom-in" data-aos-delay="400" data-aos-offset="100">
        <figure>
          <img
            src={book_image}
            alt="books"
            className="rounded-xl w-3/5 lg:w-1/2"
          />
        </figure>
      </div>
      <div className="card-body items-center text-center p-0 px-3 gap-1">
        <h2 className="card-title font-bold text-blue-900">{book_name}</h2>
        <p>Details: {description}</p>
        <div className="flex justify-center items-center gap-3 my-1 border-2 border-red-400 rounded-lg p-3">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary">
              <img src={book_provider_image} />
            </div>
          </div>
          <h2 className="font-bold text-lg">{book_provider_name}</h2>
        </div>
        <p className="text-lg">Phone: {phone}</p>
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
