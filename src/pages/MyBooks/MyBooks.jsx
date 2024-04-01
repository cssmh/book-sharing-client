import { useEffect, useState } from "react";
import MyBooksCard from "./MyBooksCard";
import useContextHook from "../../useCustomHook/useContextHook";
import useFallingLines from "../../useCustomHook/useFallingLines";
import { Helmet } from "react-helmet-async";
import useAxiosHook from "../../useCustomHook/useAxiosHook";
import NoBook from "../../assets/NoBook.png";

const MyBooks = () => {
  const { user } = useContextHook();
  const [loading, setLoading] = useState(true);
  const [myBooks, setMyBooks] = useState([]);
  const axiosCustom = useAxiosHook();

  const url = `/myBooks?email=${user.email}`;
  useEffect(() => {
    axiosCustom?.get(url).then((res) => {
      setMyBooks(res.data);
      setLoading(false);
    });
  }, [axiosCustom, url]);

  const fallingLines = useFallingLines();
  return (
    <div>
      <Helmet>
        <title>BookHaven | My-Books</title>
      </Helmet>
      {loading ? (
        fallingLines
      ) : (
        <div>
          {myBooks.length == 0 ? (
            <div>
              <p className="text-center text-xl md:text-2xl font-semibold text-red-600 italic mt-6">
                No Book Added By You
              </p>
              <img src={NoBook} className="mx-auto" alt="" />
            </div>
          ) : (
            <>
              <h2 className="text-2xl md:text-2xl font-bold my-5 text-center italic">
                All Books Added By You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {myBooks.map((book) => (
                  <MyBooksCard
                    key={book._id}
                    getBook={book}
                    myBooks={myBooks}
                    setMyBooks={setMyBooks}
                  ></MyBooksCard>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
