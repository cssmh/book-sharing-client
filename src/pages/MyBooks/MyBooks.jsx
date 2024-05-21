import { Helmet } from "react-helmet-async";
import NoBook from "../../assets/NoBook.png";
import MyBooksCard from "../MyBooksCard/MyBooksCard";
import { FallingLines } from "react-loader-spinner";
import useContextHook from "../../useCustomHook/useContextHook";
import useAxiosPublic from "../../useCustomHook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const MyBooks = () => {
  const { user } = useContextHook();
  const axiosNoToken = useAxiosPublic()

  const getMyBooks = async () => {
    const res = await axiosNoToken.get(`/my-books?email=${user?.email}`);
    return res?.data;
  };

  const {
    isLoading,
    error,
    data: myBooks,
    refetch,
  } = useQuery({
    queryKey: ["myBooks", user?.email],
    queryFn: getMyBooks,
    enabled: !!user?.email, // Ensure the query runs only when the email is available
  });

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <FallingLines
          color="#9933FF"
          width="55"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
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
      {myBooks.length === 0 ? (
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
            {myBooks.map((book) => (
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
