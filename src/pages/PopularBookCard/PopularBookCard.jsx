import { Link } from "react-router-dom";
const PopularBookCard = ({ getBook }) => {
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
  let smallDesc = description.slice(0, 130);
  // HomePage Popular Books card

  return (
    <div className="card bg-base-100 shadow-xl py-4">
      <div data-aos="zoom-in" data-aos-delay="400" data-aos-offset="100">
        <figure>
          <img src={book_image} alt="Books" className="rounded-xl w-1/2 lg:h-[270px]" />
        </figure>
      </div>
      <div className="card-body items-center text-center p-0 px-3 gap-1">
        <h2 className="card-title font-bold text-blue-900 mt-2">{book_name}</h2>
        <p className="px-2">Details: {smallDesc}...</p>
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

export default PopularBookCard;
