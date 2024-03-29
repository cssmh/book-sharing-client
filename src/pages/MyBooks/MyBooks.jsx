import { useEffect, useState } from "react";
import MyBooksCard from "./MyBooksCard";
import useContextHook from "../../useCustomHook/useContextHook";
import { FallingLines } from "react-loader-spinner";
import { Helmet } from "react-helmet-async";
import useAxiosHook from "../../useCustomHook/useAxiosHook";
import noBooks from "../../assets/noBooks.png";

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

  return (
    <div>
      <Helmet>
        <title>BookHaven | My-Books</title>
      </Helmet>
      {loading ? (
        <div className="flex justify-center">
          <FallingLines
            color="#9933FF"
            width="60"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      ) : (
        <div>
          {myBooks.length == 0 ? (
            <div>
              <p className="text-center text-xl md:text-2xl font-semibold text-red-600 italic mt-6">
                No Book Added By You
              </p>
              <img src={noBooks} className="mx-auto" alt="" />
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
