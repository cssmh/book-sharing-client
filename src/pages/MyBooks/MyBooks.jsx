import { Helmet } from "react-helmet-async";
import NoBook from "../../assets/NoBook.png";
import MyBooksCard from "../MyBooksCard/MyBooksCard";
import useAuth from "../../Hooks/useAuth";
import useMyBooks from "../../Hooks/useMyBooks";
import SmallSpinner from "../../Components/SmallSpinner/SmallSpinner";

const MyBooks = () => {
  const { user } = useAuth();
  const url = `/my-books?email=${user?.email}`;
  const { isLoading, bookData, error, refetch } = useMyBooks(url);

  if (isLoading) {
    return <SmallSpinner />;
  }

  if (error) {
    return (
      <div className="text-center text-xl md:text-2xl font-semibold text-red-600 italic mt-6">
        An error occurred while fetching your books.
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>BookHaven | My-Books</title>
      </Helmet>
      {bookData.length === 0 ? (
        <div>
          <p className="text-center text-xl md:text-2xl font-semibold text-red-600 italic mt-6">
            No Book Added By You
          </p>
          <img
            src={NoBook}
            className="mx-auto"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      ) : (
        <>
          <h2 className="text-xl md:text-2xl font-bold mt-5 mb-3 md:mb-5 text-center italic">
            All Books Added By You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {bookData?.map((book) => (
              <MyBooksCard
                key={book._id}
                getBook={book}
                refetch={refetch}
              ></MyBooksCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyBooks;
