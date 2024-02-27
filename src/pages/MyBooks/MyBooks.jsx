import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import MyBooksCard from "./MyBooksCard";
import { FallingLines } from "react-loader-spinner";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [myBooks, setMyBooks] = useState([]);

  const url = `https://book-sharing-server.vercel.app/books?email=${user.email}`;
  useEffect(() => {
    axios.get(url, { withCredentials: true }).then((res) => {
      setMyBooks(res.data);
      setLoading(false);
    });
  }, [url]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <FallingLines
          color="#6cc262"
          width="70"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>BookHaven | My-Books</title>
      </Helmet>
      <h2 className="text-2xl md:text-2xl font-bold my-5 text-center italic">
        All Books Added By You
      </h2>
      {myBooks.length == 0 ? (
        <p className="text-center text-xl md:text-2xl font-semibold text-red-600">
          No Book Added By You
        </p>
      ) : (
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
      )}
    </div>
  );
};

export default MyBooks;
