import { Link } from "react-router-dom";
const PopularBookCard = ({ getBook }) => {
  const {
    _id,
    book_name,
    book_image,
    provider_image,
    provider_name,
    provider_phone,
    provider_location,
    description,
  } = getBook;

  return (
    <div className="relative card bg-base-100 shadow-lg py-5 mb-4 h-[460px] border group">
      <figure>
        <img
          src={book_image}
          onContextMenu={(e) => e.preventDefault()}
          className="rounded-xl w-[20%] md:w-[25%]"
        />
      </figure>
      <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded">
          Popular
        </div>
      <div className="group-hover:scale-105 group-hover:transition-all group-hover:duration-300 card-body items-center text-center p-0 px-3 gap-[0px]">
        <h2 className="text-blue-900 text-xl md:text-[21px] font-bold mt-2 px-2">
          {book_name}
        </h2>
        <p className="px-5">{description.slice(0, 90)}...</p>
        <div className="flex items-center gap-3 mb-3 border border-red-400 rounded-full px-3 py-2 bg-red-100 shadow-md">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary">
              <img
                src={provider_image}
                alt={provider_name}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
          <h2 className="font-bold text-md">{provider_name}</h2>
        </div>
        <p className="text-green-500 font-semibold">Phone: {provider_phone}</p>
        <p className="text-gray-500">Location: {provider_location}</p>
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
