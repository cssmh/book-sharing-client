import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import AddBooking from "../AddBooking/AddBooking";
import useAuth from "../../Hooks/useAuth";
import SmallLoader from "../../Components/SmallLoader";
import useDataQuery from "../../Hooks/useDataQuery";
import HavenHelmet from "../../Components/HavenHelmet";

const BookDetails = () => {
  const [desc, setDesc] = useState(true);
  const { user } = useAuth();
  const loadBookData = useLoaderData();

  const url = `/providers-books?email=${loadBookData?.provider_email}`;
  const { isLoading, data: bookData = [] } = useDataQuery(["myBooks"], url);

  if (isLoading) return <SmallLoader size={77} />;

  const {
    _id,
    book_name,
    book_image,
    provider_name,
    provider_email,
    provider_image,
    provider_phone,
    provider_location,
    description,
    added_time,
    book_status,
    user_name,
    user_review,
  } = loadBookData;

  const handleViewDetails = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 200,
        behavior: "smooth",
        // behavior: "auto",  This will make the scroll instant
      });
    }, 500);
  };

  return (
    <div>
      <HavenHelmet title={book_name} />
      <div className="card max-w-xl mx-auto bg-gradient-to-r from-yellow-100 to-amber-100 shadow-xl p-6 mt-2 md:mt-4">
        <h2 className="text-center font-bold text-xl md:text-[22px] text-blue-800 italic">
          Book Provider Information
        </h2>
        <figure className="flex justify-center my-2">
          <img
            className="rounded-full w-24 shadow-xl"
            src={provider_image}
            onContextMenu={(e) => e.preventDefault()}
            alt="Provider"
          />
        </figure>
        <div className="text-center text-lg">
          <h3 className="text-orange-500 font-bold">{provider_name}</h3>
          <p className="text-gray-700">Email: {provider_email}</p>
          <p className="text-green-500">Phone:{provider_phone}</p>
          <p className="text-lg font-medium">
            Location: <span className="text-blue-500">{provider_location}</span>
          </p>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-7 py-8">
        <div className="flex-1">
          <figure>
            <img
              src={book_image}
              onContextMenu={(e) => e.preventDefault()}
              className="rounded-xl w-[140px] lg:w-[210px] md:h-[280px] mx-auto lg:mx-0 lg:ml-auto"
            />
          </figure>
        </div>
        <div className="flex-1 space-y-1 text-center lg:text-left">
          <h2 className="text-[21px] font-bold text-blue-900 lg:w-[80%] mx-3 md:mx-0">
            {book_name}
          </h2>
          <p>
            Added: <span className="text-blue-600">{added_time}</span>
          </p>
          {provider_email !== user?.email && book_status === "available" && (
            <AddBooking getBookData={loadBookData} />
          )}
          {provider_email === user?.email && book_status === "Unavailable" && (
            <p className="text-green-600">You shared this book.</p>
          )}
          {provider_email !== user?.email && book_status === "Unavailable" && (
            <p className="text-lg text-red-600">Unavailable to Collect..</p>
          )}
          {book_status === "available" && provider_email === user?.email && (
            <Link to={`/update-book/${_id}`}>
              <button className="text-white bg-primary font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mt-2 mx-2 md:mx-0">
                Update This Book
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="max-w-[1200px] mx-4 lg:mx-auto mb-4">
        <div className="flex gap-1">
          <button
            onClick={() => setDesc(true)}
            className="bg-blue-500 px-3 py-2 text-white rounded-md mb-2"
          >
            Description
          </button>
          {user_review && (
            <button
              onClick={() => setDesc(false)}
              className="bg-green-500 px-3 py-2 text-white rounded-md mb-2"
            >
              Collector Review
            </button>
          )}
        </div>
        {desc ? (
          <p>{description}</p>
        ) : (
          <p>
            <span className="font-semibold">{user_name}</span> - {user_review}
          </p>
        )}
      </div>
      <div className="max-w-[1200px] mx-4 lg:mx-auto mb-10">
        <h2 className="text-2xl font-bold text-blue-900 mb-7">
          More Books by {provider_name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {bookData
            ?.filter((book) => book._id !== _id)
            .map((book) => (
              <div
                key={book._id}
                className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <figure className="relative">
                  <img
                    src={book.book_image}
                    alt={book.book_name}
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-44 object-contain rounded-lg pt-3"
                  />
                </figure>
                <div className="p-4 flex flex-col justify-between flex-grow space-y-1">
                  <h3 className="text-lg font-semibold text-blue-800 truncate">
                    {book.book_name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {book.description.length > 0
                      ? book.description.length > 100
                        ? `${book.description.substring(0, 90)}...`
                        : book.description
                      : ".........."}
                  </p>
                  <div className="flex flex-col justify-between">
                    <div className="text-sm flex items-center gap-1">
                      Status:
                      <span
                        className={`font-semibold ${
                          book.book_status === "available"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {book.book_status}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 font-semibold">
                    <span>{`Added: ${new Date(
                      book.added_time
                    ).toLocaleDateString()}`}</span>
                    <Link
                      to={`/book/${book.book_name
                        .toLowerCase()
                        .replaceAll(/\s+/g, "_")}/${book._id}`}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-3 py-2 transition-colors"
                      onClick={handleViewDetails}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
