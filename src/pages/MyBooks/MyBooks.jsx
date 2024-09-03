import MyBooksCard from "../MyBooksCard/MyBooksCard";
import useAuth from "../../Hooks/useAuth";
import MyBookSke from "../../Components/AllSkeleton/MyBookSke";
import useDataQuery from "../../Hooks/useDataQuery";
import HavenHelmet from "../../Components/HavenHelmet";

const MyBooks = () => {
  const { user } = useAuth();
  const url = `/providers-books?email=${user?.email}`;
  const {
    isLoading,
    data: bookData = [],
    error,
    refetch,
  } = useDataQuery(["myBooks"], url);

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 p-1 md:p-4 mt-2 md:mx-5">
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
      <HavenHelmet title="My Books" />
      {bookData?.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-[70vh] my-2 md:mt-0 text-red-600">
          <p className="text-[21px] font-semibold text-center italic">
            No Book Added By You
          </p>
        </div>
      ) : (
        <div>
          <p className="bg-gray-800 text-white md:px-7 py-2 md:py-4 md:flex flex-col md:flex-row justify-between items-center relative text-center text-[21px] mb-2 font-semibold">
            <span>All Books Added By You</span> ({bookData?.length})
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-1 md:px-4 py-2 md:mx-5">
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
