import { Link } from "react-router-dom";
const AllBooksCard = ({ getBook }) => {
  const {
    _id,
    book_image,
    book_name,
    provider_image,
    provider_name,
    provider_phone,
    provider_location,
    description,
    book_status,
  } = getBook;

  return (
    <div className="md:group relative card shadow-xl py-6">
      <figure>
        <img
          data-aos="zoom-in"
          data-aos-duration="700"
          data-aos-offset="100"
          src={book_image}
          alt="book"
          onContextMenu={(e) => e.preventDefault()}
          className="rounded-xl w-[20%] md:w-[25%]"
        />
      </figure>
      <div
        className={`absolute top-2 left-2 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md ${
          book_status === "available" ? "bg-blue-600" : "bg-red-600"
        }`}
      >
        {book_status === "available" ? "available" : "Unavailable"}
      </div>
      <div className="group-hover:scale-105 group-hover:transition-all group-hover:duration-300 card-body items-center text-center p-0 px-3 gap-[0px]">
        <h2 className="text-blue-900 text-xl md:text-[21px] font-bold mt-2 px-2">
          {book_name}
        </h2>
        <p className="px-5 my-1">{description?.slice(0, 87)}...</p>
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
          <Link
            to={`/book/${book_name
              .toLowerCase()
              .replaceAll(/\s+/g, "_")}/${_id}`}
          >
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
