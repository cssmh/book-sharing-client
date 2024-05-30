import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { HashLoader } from "react-spinners";
import AllBooksCard from "../AllBooksCard/AllBooksCard";
import useAxiosPublic from "../../Shared/useCustomHook/useAxiosPublic";
import useProviderHook from "../../Shared/useCustomHook/useProviderHook";

const AllBooks = () => {
  let searchTerm;
  const axiosNoToken = useAxiosPublic();
  const [allBooks, setAllBooks] = useState([]);
  const [totalBooksCount, setTotalBooksCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [isLoading, setIsLoading] = useState(true);
  const booksPerPageCount = Math.ceil(totalBooksCount / limit);
  const { allBooks: totalBooksForSearch } = useProviderHook();

  useEffect(() => {
    axiosNoToken.get(`/all-books?page=${page}&limit=${limit}`).then((res) => {
      setAllBooks(res.data?.result);
      setTotalBooksCount(res.data?.totalBooks);
      setIsLoading(false);
    });
  }, [page, limit, axiosNoToken]);

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
      {isLoading ? (
        <div className="flex justify-center mt-5">
          <HashLoader color="#9933FF" size={32} />
        </div>
      ) : (
        <div>
          <div className="text-center my-4">
            <input
              type="text"
              name="name"
              placeholder="Search for Books or Authors"
              className="input input-bordered rounded-3xl min-w-[75%] md:min-w-[320px] border-red-500"
              style={{ outline: "none" }}
              onChange={(e) => {
                searchTerm = e.target.value;
                // console.log(searchTerm);
                if (searchTerm === "") {
                  setAllBooks(totalBooksForSearch.slice(0, limit));
                  setTotalBooksCount(totalBooksForSearch.length);
                } else {
                  const searchItem = totalBooksForSearch.filter(
                    (books) =>
                      books.book_name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      books.book_provider_name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  );
                  setAllBooks(searchItem);
                  setTotalBooksCount(searchItem.length);
                }
              }}
            />
            {allBooks.length > 0 && (
              <div className="max-w-7xl mx-auto md:relative mt-4">
                <h2 className="text-xl md:text-[26px] font-semibold italic text-center">
                  All Books Available for you
                </h2>
              </div>
            )}
          </div>
          <div>
            {allBooks.length === 0 ? (
              <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-10">
                No Book found!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {allBooks?.map((book) => (
                  <AllBooksCard key={book._id} getBook={book}></AllBooksCard>
                ))}
              </div>
            )}
            {allBooks.length > 0 && (
              <div className="flex justify-center">
                <div className="flex flex-col md:flex-row justify-center mt-8">
                  <div className="join">
                    <button
                      onClick={handlePrevious}
                      className="join-item btn btn-active hover:border-green-400 hover:bg-yellow-50 border-green-400 bg-yellow-50 hover:text-green-40 text-green-400"
                    >
                      Previous
                    </button>
                    <div className="flex flex-wrap m-0 justify-center md:justify-start">
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
                                  ? "btn border-green-400 hover:border-green-400 bg-green-400 text-white rounded-none mb-2"
                                  : "btn border-green-400 hover:border-green-400 bg-yellow-50 hover:bg-green-400 text-green-400 hover:text-white rounded-none mb-2 md:mb-0"
                              }
                            >
                              {pageNumber}
                            </button>
                          );
                        })}
                    </div>
                    <button
                      onClick={handleNext}
                      className="join-item btn btn-active hover:border-green-400 hover:bg-yellow-50 border-green-400 bg-yellow-50 hover:text-green-40 text-green-400"
                    >
                      Next
                    </button>
                  </div>
                  <div className="ml-6 md:ml-0 text-center md:text-left mt-2 md:mt-0">
                    <select
                      onChange={(e) => {
                        setLimit(parseInt(e.target.value));
                        setPage(1);
                      }}
                      defaultValue={limit}
                      className="input input-bordered border-green-400 text-green-500 outline-none"
                    >
                      <option value="3">3</option>
                      <option value="6">6</option>
                      <option value="9">9</option>
                      <option value="12">12</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
