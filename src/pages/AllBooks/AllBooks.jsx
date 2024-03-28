import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import AllBooksCard from "../AllBooksCard/AllBooksCard";
import { HashLoader } from "react-spinners";

const AllBooks = () => {
  const loadAllBooks = useLoaderData();
  let searchTerm;
  const [allBooks, setAllBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/allBooks?page=${page}&limit=${limit}`)
      .then((res) => {
        setAllBooks(res.data?.result);
        setTotalBooks(res?.data?.totalBooks);
        setIsLoading(false);
      });
  }, [page]);
  const limit = 9;
  const booksPerPageCount = Math.ceil(totalBooks / 9);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < booksPerPageCount) setPage(page + 1);
  };

  return (
    <div>
      <Helmet>
        <title>BookHaven | All Books</title>
      </Helmet>
      <div className="text-center my-6">
        <input
          type="text"
          name="name"
          placeholder="Search Here"
          className="input input-bordered w-80 border-red-500"
          onChange={(e) => {
            searchTerm = e.target.value;
            // console.log(searchTerm);
            if (searchTerm === "") {
              setAllBooks(loadAllBooks);
            } else {
              const searchItem = loadAllBooks.filter((books) =>
                books.book_name.toLowerCase().includes(searchTerm.toLowerCase())
              );
              setAllBooks(searchItem);
            }
          }}
        />
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold italic">
          All Books Available for you
        </h2>
      </div>
      {isLoading ? (
        <div className="flex justify-center mt-5">
          <HashLoader color="#9933FF" size={36} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {allBooks.map((book) => (
            <AllBooksCard key={book._id} getBook={book}></AllBooksCard>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-8">
        <div className="join">
          <button
            onClick={handlePrevious}
            className="join-item btn btn-outline"
          >
            Previous
          </button>
          {Array(booksPerPageCount)
            .fill(0)
            .map((getPage, idx) => {
              const pageNumber = idx + 1;
              return (
                <button
                  onClick={() => setPage(pageNumber)}
                  key={pageNumber}
                  className={
                    page === pageNumber
                      ? "join-item btn btn-active text-white btn-outline"
                      : "join-item btn btn-outline"
                  }
                >
                  {pageNumber}
                </button>
              );
            })}
          <button onClick={handleNext} className="join-item btn btn-outline">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
