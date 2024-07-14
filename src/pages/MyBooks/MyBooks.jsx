import { Helmet } from "react-helmet-async";
import MyBooksCard from "../MyBooksCard/MyBooksCard";
import useAuth from "../../Hooks/useAuth";
import useMyBooks from "../../Hooks/useMyBooks";
import MyBookSke from "../../Components/AllSkeleton/MyBookSke";

const MyBooks = () => {
  const { user } = useAuth();
  const url = `/my-books?email=${user?.email}`;
  const { isLoading, bookData, error, refetch } = useMyBooks(url);

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[...Array(3)].map((_, index) => (
          <MyBookSke key={index} />
        ))}
      </div>
    );

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[83vh] text-[21px] font-bold text-center italic my-2 md:mt-0 text-red-600">
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
          <p className="flex justify-center items-center min-h-[83vh] text-[21px] font-bold text-center italic my-2 md:mt-0 text-red-600">
            No Book Added By You
          </p>
        </div>
      ) : (
        <>
          <h2 className="bg-rose-100 text-[21px] font-bold text-center italic my-2 md:mt-0">
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
