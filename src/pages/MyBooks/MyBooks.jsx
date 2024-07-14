import { Helmet } from "react-helmet-async";
import MyBooksCard from "../MyBooksCard/MyBooksCard";
import useAuth from "../../Hooks/useAuth";
import useMyBooks from "../../Hooks/useMyBooks";
import SmallSpinner from "../../Components/AllLoader/SmallSpinner";

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
    <div className="mb-4">
      <Helmet>
        <title>BookHaven | My-Books</title>
      </Helmet>
      {bookData.length === 0 ? (
        <div>
          <p className="text-center text-xl md:text-[22px] font-semibold text-red-600 mt-2 italic">
            No Book Added By You
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-[21px] font-bold text-center italic mt-2 md:mt-0">
            All Books Added By You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
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
