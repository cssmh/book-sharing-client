import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import MyBooksCard from "./MyBooksCard";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { FallingLines } from "react-loader-spinner";

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

  return (
    <div>
      <Helmet>
        <title>BookHaven | My-Books</title>
      </Helmet>
      <h2 className="text-2xl md:text-3xl font-bold mt-9 mb-5 text-center italic">
        All Books Added By You
      </h2>
      {loading && (
        <div className="flex justify-center">
          <FallingLines
            color="#6cc262"
            width="70"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      )}
      {myBooks.length == 0 ? (
        <p className="text-center text-xl md:text-2xl font-semibold text-red-600">
          No Book Added By You
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
