import { Helmet } from "react-helmet-async";
import MyBooksCard from "../MyBooksCard/MyBooksCard";
import useAuth from "../../Hooks/useAuth";
import useMyBooks from "../../Hooks/useMyBooks";
import MyBookSke from "../../Components/AllSkeleton/MyBookSke";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyBooks = () => {
  const { user } = useAuth();
  const url = `/my-books?email=${user?.email}`;
  const { isLoading, bookData, error, refetch } = useMyBooks(url);

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-5">
        {[...Array(3)].map((_, index) => (
          <MyBookSke key={index} />
        ))}
      </div>
    );

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[83vh] text-[21px] font-bold text-center italic my-2 md:mt-0 text-red-600">
        <p>An error occurred while fetching your books.</p>
        <button
          onClick={refetch}
          className="mt-2 px-4 py-1 bg-red-500 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <Helmet>
        <title>BookHaven | My Books</title>
      </Helmet>
      {bookData?.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-[72vh] my-2 md:mt-0 text-red-600">
          <p className="text-[21px] font-semibold text-center italic">
            No Book Added By You
          </p>
          <Link
            to="/add-book"
            className="mt-1 px-4 py-1 bg-green-400 text-white rounded-md flex items-center gap-2"
          >
            <FaPlus /> Add a New Book
          </Link>
        </div>
      ) : (
        <div>
          <p className="text-center text-xl mt-3 mb-1 font-semibold">
            <span className="italic">All Books Added By You</span> (
            {bookData?.length})
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 py-2 md:mx-5">
            {bookData.map((book) => (
              <MyBooksCard key={book._id} getBook={book} refetch={refetch} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
